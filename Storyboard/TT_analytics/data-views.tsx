import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Search, Filter, Download } from 'lucide-react';

const DetailedDataView = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);

  // Sample data
  const employeeData = [
    {
      id: 1,
      name: 'John Doe',
      department: 'Production',
      productivity: 94.5,
      attendance: 98.2,
      training: 85.0,
      lastUpdated: '2024-03-15'
    },
    // More data entries...
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="relative w-96">
          <input
            type="text"
            placeholder="Search employees..."
            className="w-full p-2 pl-10 border rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="h-5 w-5 absolute left-3 top-2.5 text-gray-400" />
        </div>
        
        <div className="flex space-x-4">
          <button 
            className="flex items-center space-x-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
            onClick={() => setFilterOpen(!filterOpen)}
          >
            <Filter className="h-5 w-5" />
            <span>Filter</span>
          </button>
          
          <button className="flex items-center space-x-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
            <Download className="h-5 w-5" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {filterOpen && (
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="grid grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Department</label>
                <select className="w-full p-2 border rounded-lg">
                  <option>All Departments</option>
                  <option>Production</option>
                  <option>Assembly</option>
                  <option>Quality Control</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Time Period</label>
                <select className="w-full p-2 border rounded-lg">
                  <option>Last 7 Days</option>
                  <option>Last 30 Days</option>
                  <option>Last 90 Days</option>
                  <option>Custom</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Performance</label>
                <select className="w-full p-2 border rounded-lg">
                  <option>All Levels</option>
                  <option>High Performers</option>
                  <option>Average</option>
                  <option>Needs Improvement</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Training Status</label>
                <select className="w-full p-2 border rounded-lg">
                  <option>All Status</option>
                  <option>Completed</option>
                  <option>In Progress</option>
                  <option>Not Started</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Employee Performance Data</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Department</TableHead>
                <TableHead className="text-right">Productivity</TableHead>
                <TableHead className="text-right">Attendance</TableHead>
                <TableHead className="text-right">Training</TableHead>
                <TableHead className="text-right">Last Updated</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employeeData.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell className="font-medium">{employee.name}</TableCell>
                  <TableCell>{employee.department}</TableCell>
                  <TableCell className="text-right">
                    <span className={`px-2 py-1 rounded ${
                      employee.productivity >= 90 ? 'bg-green-100 text-green-800' :
                      employee.productivity >= 80 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {employee.productivity}%
                    </span>
                  </TableCell>
                  <TableCell className="text-right">{employee.attendance}%</TableCell>
                  <TableCell className="text-right">{employee.training}%</TableCell>
                  <TableCell className="text-right">{employee.lastUpdated}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default DetailedDataView;