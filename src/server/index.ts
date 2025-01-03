import express, { Request, Response, NextFunction } from 'express';
import { join } from 'path';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import { API_URL, WEBSOCKET_URL } from '../config/apiConfig';

interface ServerError extends Error {
  status?: number;
}

interface MessageData {
  recipientId: string;
  content: string;
  type?: string;
}

interface SocketAuth {
  userId: string;
}

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: API_URL,
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(express.json());
app.use(express.static(join(__dirname, '../../dist')));

// Socket.io connection handling
io.on('connection', (socket: Socket) => {
  const auth = socket.handshake.auth as SocketAuth;
  const userId = auth && auth.userId;
  
  if (!userId) {
    socket.disconnect();
    return;
  }

  socket.join(`user:${userId}`);

  socket.on('message', (data: MessageData) => {
    if (data && data.recipientId) {
      io.to(`user:${data.recipientId}`).emit('message', {
        ...data,
        senderId: userId
      });
    }
  });

  socket.on('typing', (data: { recipientId: string }) => {
    if (data && data.recipientId) {
      io.to(`user:${data.recipientId}`).emit('typing', {
        senderId: userId
      });
    }
  });

  socket.on('disconnect', () => {
    if (userId) {
      socket.leave(`user:${userId}`);
    }
  });
});

// Error handling middleware
app.use((err: ServerError, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Server error:', err);
  res.status(err.status || 500).json({
    error: 'Internal server error',
    message: err.message || 'An unexpected error occurred'
  });
});

// Start server
const port = process.env.PORT || 3000;
httpServer.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`WebSocket server available at ${WEBSOCKET_URL}`);
});

// Handle shutdown gracefully
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  httpServer.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

export default app;
