export default function About() {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-blue-600 tracking-wide uppercase">About Us</h2>
          <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Empowering Career Growth
          </p>
          <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
            We&apos;re building the future of talent development and career advancement.
          </p>
        </div>

        <div className="mt-20">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            <div className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  {/* Icon */}
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Mission</p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-500">
                To connect talented individuals with opportunities for growth and development through innovative training programs and career pathways.
              </dd>
            </div>

            <div className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  {/* Icon */}
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Vision</p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-500">
                A world where everyone has access to meaningful career opportunities and the support needed to achieve their professional goals.
              </dd>
            </div>

            <div className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  {/* Icon */}
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Values</p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-500">
                Innovation, inclusivity, continuous learning, and commitment to excellence in everything we do.
              </dd>
            </div>

            <div className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  {/* Icon */}
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Impact</p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-500">
                Creating lasting positive change in the lives of individuals and communities through education and employment opportunities.
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
