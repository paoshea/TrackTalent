import React from 'react';
import { useSkillAssessments, useCareerProgress, useDashboardMetrics } from '../../services/mockHooks';
import { ArrowRight, Award, BookOpen, Calendar, CheckCircle2, Target, Users, Briefcase } from 'lucide-react';

export const CandidatePreview: React.FC = () => {
  const { skills, assessmentProgress, certifications } = useSkillAssessments();
  const { currentPath, progression, goals, mentorship } = useCareerProgress();
  const { metrics } = useDashboardMetrics('candidate');

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Career Development Dashboard</h3>
      
      {/* Current Role */}
      <div className="mb-8 bg-blue-50 rounded-lg p-4">
        <h4 className="text-md font-medium text-gray-900 mb-4 flex items-center">
          <Briefcase className="h-5 w-5 mr-2 text-blue-600" />
          Current Position
        </h4>
        <div className="flex justify-between items-center">
          <div>
            <div className="font-medium text-gray-900">{currentPath.role}</div>
            <div className="text-sm text-gray-500">{currentPath.company}</div>
            <div className="text-xs text-gray-500 mt-1">Since {new Date(currentPath.startDate).toLocaleDateString()}</div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">Next Milestone</div>
            <div className="font-medium text-blue-600">{currentPath.nextMilestone}</div>
            <div className="text-xs text-gray-500">Mentor: {currentPath.mentor}</div>
          </div>
        </div>
      </div>
      
      {/* Career Path */}
      <div className="mb-8 bg-blue-50 rounded-lg p-4">
        <h4 className="text-md font-medium text-gray-900 mb-4 flex items-center">
          <Target className="h-5 w-5 mr-2 text-blue-600" />
          Career Path
        </h4>
        <div className="flex items-center justify-between mb-4">
          <div className="flex-1 text-center">
            <div className="text-sm text-gray-500">Current Role</div>
            <div className="font-medium text-gray-900">{progression.current.role}</div>
            <div className="text-sm text-gray-500">{progression.current.timeInRole}</div>
          </div>
          <ArrowRight className="h-5 w-5 text-blue-600 mx-4" />
          <div className="flex-1 text-center">
            <div className="text-sm text-gray-500">Next Role</div>
            <div className="font-medium text-gray-900">{progression.next.role}</div>
            <div className="text-sm text-blue-600">{progression.next.timeline}</div>
          </div>
          <ArrowRight className="h-5 w-5 text-blue-600 mx-4" />
          <div className="flex-1 text-center">
            <div className="text-sm text-gray-500">Future Role</div>
            <div className="font-medium text-gray-900">{progression.future.role}</div>
            <div className="text-sm text-blue-600">{progression.future.timeline}</div>
          </div>
        </div>
      </div>

      {/* Mentorship */}
      <div className="mb-8 bg-purple-50 rounded-lg p-4">
        <h4 className="text-md font-medium text-gray-900 mb-4 flex items-center">
          <Users className="h-5 w-5 mr-2 text-purple-600" />
          Your Mentor
        </h4>
        <div className="flex justify-between items-start">
          <div>
            <div className="font-medium text-gray-900">{mentorship.mentor.name}</div>
            <div className="text-sm text-gray-500">{mentorship.mentor.role} at {mentorship.mentor.company}</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {mentorship.mentor.expertise.map(skill => (
                <span key={skill} className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium text-purple-600">Next Session</div>
            <div className="text-sm text-gray-500">{new Date(mentorship.nextSession.date).toLocaleDateString()}</div>
            <div className="text-sm text-gray-900">{mentorship.nextSession.topic}</div>
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gray-50 p-4 rounded-md">
          <div className="text-sm text-gray-500">Active Jobs</div>
          <div className="text-xl font-semibold text-gray-900">{metrics.activeJobs.value}</div>
          <div className="text-sm text-green-600">+{metrics.activeJobs.change} this week</div>
        </div>
        <div className="bg-gray-50 p-4 rounded-md">
          <div className="text-sm text-gray-500">Applications</div>
          <div className="text-xl font-semibold text-gray-900">{metrics.applications.value}</div>
          <div className="text-sm text-green-600">+{metrics.applications.change} this week</div>
        </div>
        <div className="bg-gray-50 p-4 rounded-md">
          <div className="text-sm text-gray-500">Interviews</div>
          <div className="text-xl font-semibold text-gray-900">{metrics.interviews.value}</div>
          <div className="text-sm text-green-600">+{metrics.interviews.change} this week</div>
        </div>
        <div className="bg-gray-50 p-4 rounded-md">
          <div className="text-sm text-gray-500">Response Rate</div>
          <div className="text-xl font-semibold text-gray-900">{metrics.responseRate.value}%</div>
          <div className="text-sm text-green-600">+{metrics.responseRate.change}% this week</div>
        </div>
      </div>

      {/* Skills and Certifications */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Verified Skills */}
        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-md font-medium text-gray-900 flex items-center">
              <CheckCircle2 className="h-5 w-5 mr-2 text-green-600" />
              Verified Skills
            </h4>
            <div className="flex gap-3 text-xs">
              <span className="text-gray-600">
                <strong className="text-green-600">{assessmentProgress.completed}</strong> Completed
              </span>
              <span className="text-gray-600">
                <strong className="text-blue-600">{assessmentProgress.inProgress}</strong> In Progress
              </span>
              <span className="text-gray-600">
                <strong className="text-gray-600">{assessmentProgress.upcoming}</strong> Upcoming
              </span>
            </div>
          </div>
          <div className="space-y-4">
            {skills.map(skill => (
              <div key={skill.name} className="bg-white rounded-lg p-3 shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <span className="font-medium text-gray-900">{skill.name}</span>
                    <span className="ml-2 text-sm text-green-600 capitalize">{skill.level}</span>
                  </div>
                  <span className="text-xs text-gray-500">
                    Verified by {skill.verifiedBy}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full" 
                    style={{ width: `${(skill.nextLevel.completedHours / skill.nextLevel.requiredHours) * 100}%` }}
                  />
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {skill.nextLevel.completedHours}/{skill.nextLevel.requiredHours}hrs to {skill.nextLevel.name}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="bg-yellow-50 rounded-lg p-4">
          <h4 className="text-md font-medium text-gray-900 mb-4 flex items-center">
            <Award className="h-5 w-5 mr-2 text-yellow-600" />
            Certifications
          </h4>
          {certifications.map(cert => (
            <div key={cert.name} className="bg-white rounded-lg p-3 shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-gray-900">{cert.name}</span>
                <span className="text-xs text-gray-500">
                  Est. Completion: {new Date(cert.estimatedCompletion).toLocaleDateString()}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-yellow-600 h-2 rounded-full" 
                  style={{ width: `${cert.progress}%` }}
                />
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {cert.progress}% Complete
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Learning Goals */}
      <div className="bg-indigo-50 rounded-lg p-4">
        <h4 className="text-md font-medium text-gray-900 mb-4 flex items-center">
          <BookOpen className="h-5 w-5 mr-2 text-indigo-600" />
          Learning Goals
        </h4>
        <div className="grid md:grid-cols-2 gap-4">
          {goals.map(goal => (
            <div key={goal.title} className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="font-medium text-gray-900">{goal.title}</span>
                  <div className="text-sm text-gray-500 mt-1">
                    <Calendar className="h-4 w-4 inline mr-1" />
                    Due: {new Date(goal.deadline).toLocaleDateString()}
                  </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  goal.type === 'certification' ? 'bg-yellow-100 text-yellow-800' :
                  goal.type === 'project' ? 'bg-blue-100 text-blue-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {goal.type}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div 
                  className={`h-2 rounded-full ${
                    goal.type === 'certification' ? 'bg-yellow-600' :
                    goal.type === 'project' ? 'bg-blue-600' :
                    'bg-green-600'
                  }`}
                  style={{ width: `${goal.progress}%` }}
                />
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">{goal.progress}% complete</span>
                <div className="text-right">
                  <div className="font-medium text-gray-900">Next Meeting</div>
                  <div className="text-gray-500">{new Date(goal.nextMeeting).toLocaleDateString()}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
