import React from 'react';
import { BookOpen, Clock, Award, ChevronRight } from 'lucide-react';

const LearningPathProgress = () => {
  const courses = [
    {
      id: 1,
      title: 'Advanced React Patterns',
      progress: 75,
      totalHours: 12,
      completedHours: 9,
      status: 'in-progress'
    },
    {
      id: 2,
      title: 'System Design Fundamentals',
      progress: 100,
      totalHours: 8,
      completedHours: 8,
      status: 'completed'
    },
    {
      id: 3,
      title: 'Cloud Architecture with AWS',
      progress: 0,
      totalHours: 15,
      completedHours: 0,
      status: 'not-started'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-medium text-gray-900">Learning Path</h2>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
            2/5 Courses Complete
          </span>
        </div>

        <div className="space-y-6">
          {courses.map((course) => (
            <div key={course.id} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
              <div className="flex items-start">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <h3 className="text-sm font-medium text-gray-900">{course.title}</h3>
                    {course.status === 'completed' && (
                      <Award className="h-4 w-4 text-green-500 ml-2" />
                    )}
                  </div>

                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{course.completedHours}/{course.totalHours} hours completed</span>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                    <div
                      className="h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${course.progress}%`,
                        backgroundColor: course.status === 'completed' ? '#22C55E' : '#6366F1'
                      }}
                    />
                  </div>

                  {course.status === 'in-progress' && (
                    <button className="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-500">
                      Continue Learning
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </button>
                  )}
                  {course.status === 'not-started' && (
                    <button className="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-500">
                      Start Course
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-between items-center pt-6 border-t border-gray-200">
          <div className="flex items-center">
            <BookOpen className="h-5 w-5 text-indigo-600 mr-2" />
            <span className="text-sm text-gray-600">3 courses in progress</span>
          </div>
          <button className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
            View All Courses
          </button>
        </div>
      </div>
    </div>
  );
};

export default LearningPathProgress;