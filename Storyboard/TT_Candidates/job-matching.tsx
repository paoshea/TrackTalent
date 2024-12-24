import React from 'react';
import { CircleCheck, AlertCircle, ArrowRight } from 'lucide-react';

const JobMatchingSummary = () => {
  const matchedSkills = ['React', 'TypeScript', 'Node.js'];
  const missingSkills = ['AWS', 'Docker'];

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-medium text-gray-900">Job Match Analysis</h2>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
            85% Match
          </span>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">Matching Skills</h3>
            <div className="space-y-3">
              {matchedSkills.map((skill) => (
                <div key={skill} className="flex items-center text-sm">
                  <CircleCheck className="h-5 w-5 text-green-500 mr-2" />
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">Skills to Develop</h3>
            <div className="space-y-3">
              {missingSkills.map((skill) => (
                <div key={skill} className="flex items-center text-sm">
                  <AlertCircle className="h-5 w-5 text-orange-500 mr-2" />
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <h3 className="text-sm font-medium text-gray-900 mb-4">Recommended Jobs</h3>
            <div className="space-y-4">
              <div className="group">
                <a href="/jobs/1" className="block hover:bg-gray-50 rounded-lg p-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Senior Frontend Developer</h4>
                      <p className="text-sm text-gray-500">TechCorp • Remote</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                  </div>
                </a>
              </div>

              <div className="group">
                <a href="/jobs/2" className="block hover:bg-gray-50 rounded-lg p-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Full Stack Engineer</h4>
                      <p className="text-sm text-gray-500">StartupX • New York, NY</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                  </div>
                </a>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button className="text-sm text-indigo-600 hover:text-indigo-500 font-medium">
              View All Matches
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobMatchingSummary;