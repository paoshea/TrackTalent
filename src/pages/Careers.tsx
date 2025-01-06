export default function Careers() {
  const positions = [
    {
      id: 1,
      title: 'Full Stack Developer',
      department: 'Engineering',
      type: 'Full-time',
      location: 'Remote',
      description: 'Join our engineering team to build the future of talent development.',
    },
    {
      id: 2,
      title: 'Product Manager',
      department: 'Product',
      type: 'Full-time',
      location: 'Remote',
      description: 'Lead product strategy and development for our platform.',
    },
    {
      id: 3,
      title: 'UX Designer',
      department: 'Design',
      type: 'Full-time',
      location: 'Remote',
      description: 'Create intuitive and engaging user experiences.',
    },
  ];

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-blue-600 tracking-wide uppercase">Careers</h2>
          <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Join Our Team
          </p>
          <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
            Help us build the future of talent development and career advancement.
          </p>
        </div>

        <div className="mt-12">
          <div className="space-y-4">
            {positions.map((position) => (
              <div
                key={position.id}
                className="bg-white shadow overflow-hidden sm:rounded-lg border border-gray-200"
              >
                <div className="px-4 py-5 sm:px-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        {position.title}
                      </h3>
                      <p className="mt-1 max-w-2xl text-sm text-gray-500">
                        {position.department} · {position.type} · {position.location}
                      </p>
                    </div>
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                    >
                      Apply Now
                    </button>
                  </div>
                  <p className="mt-4 text-sm text-gray-500">{position.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 bg-gray-50 sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Don&apos;t see a position that matches your skills?
            </h3>
            <div className="mt-2 max-w-xl text-sm text-gray-500">
              <p>
                We&apos;re always looking for talented individuals to join our team.
                Send us your resume and we&apos;ll keep you in mind for future opportunities.
              </p>
            </div>
            <div className="mt-5">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Submit Resume
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
