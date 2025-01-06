export default function SuccessStories() {
  const stories = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Software Engineer',
      company: 'TechCorp',
      image: '/images/testimonials/sarah.jpg',
      quote: 'The training program completely transformed my career path. I went from a non-technical background to becoming a software engineer in just 6 months.',
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Data Analyst',
      company: 'DataCorp',
      image: '/images/testimonials/michael.jpg',
      quote: 'The mentorship and support I received were invaluable. I gained both technical skills and professional confidence.',
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'UX Designer',
      company: 'DesignStudio',
      image: '/images/testimonials/emily.jpg',
      quote: 'The hands-on projects and industry connections helped me land my dream job in UX design.',
    },
  ];

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-blue-600 tracking-wide uppercase">Success Stories</h2>
          <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Real Stories, Real Success
          </p>
          <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
            Hear from our graduates who have transformed their careers through our programs.
          </p>
        </div>

        <div className="mt-12">
          <div className="space-y-12">
            {stories.map((story) => (
              <div
                key={story.id}
                className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-16"
              >
                <div className="relative h-64 overflow-hidden rounded-lg md:h-auto">
                  <img
                    className="h-full w-full object-cover"
                    src={story.image}
                    alt={`${story.name}&apos;s success story`}
                  />
                </div>
                <div className="relative">
                  <blockquote>
                    <p className="text-xl font-medium text-gray-900">
                      &ldquo;{story.quote}&rdquo;
                    </p>
                    <footer className="mt-8">
                      <div className="flex items-start">
                        <div>
                          <div className="text-base font-medium text-gray-900">{story.name}</div>
                          <div className="text-base font-medium text-blue-600">
                            {story.role} at {story.company}
                          </div>
                        </div>
                      </div>
                    </footer>
                  </blockquote>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
