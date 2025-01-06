import React from 'react';

const Terms: React.FC = () => {
  return (
    <div className="min-h-screen bg-white py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
        
        <div className="prose prose-lg">
          <p className="text-gray-600 mb-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              1. Agreement to Terms
            </h2>
            <p className="text-gray-600">
              By accessing or using TrackTalent, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              2. Use License
            </h2>
            <p className="text-gray-600 mb-4">
              Permission is granted to temporarily access TrackTalent for personal or business use, subject to the following restrictions:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>You must not modify or copy the materials</li>
              <li>You must not use the materials for commercial purposes</li>
              <li>You must not attempt to reverse engineer any software</li>
              <li>You must not remove any copyright or proprietary notations</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              3. User Accounts
            </h2>
            <p className="text-gray-600 mb-4">
              When creating an account, you agree to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Provide accurate and complete information</li>
              <li>Maintain the security of your account</li>
              <li>Accept responsibility for all activities under your account</li>
              <li>Not share your account credentials</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              4. Platform Rules
            </h2>
            <p className="text-gray-600 mb-4">
              Users must not:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Post false or misleading information</li>
              <li>Harass or discriminate against other users</li>
              <li>Violate any applicable laws or regulations</li>
              <li>Attempt to interfere with the platform&apos;s security</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              5. Disclaimer
            </h2>
            <p className="text-gray-600">
              The materials on TrackTalent are provided on an &apos;as is&apos; basis. TrackTalent makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              6. Limitations
            </h2>
            <p className="text-gray-600">
              In no event shall TrackTalent or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use TrackTalent.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              7. Contact Information
            </h2>
            <p className="text-gray-600">
              If you have any questions about these Terms, please contact us at:
              <br />
              <a href="mailto:legal@tracktalent.com" className="text-blue-600 hover:text-blue-800">
                legal@tracktalent.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;
