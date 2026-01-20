"use client";

import React from 'react';
import Image from 'next/image';
import { Calendar, Clock, ArrowLeft, Share2 } from 'lucide-react';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { useBlogs } from '@/contexts/BlogsContext';

// Sample blog content - in a real app, this would come from a CMS or database
const getBlogContent = (slug: string) => {
  const contents: Record<string, string> = {
    "the-complete-guide-to-canadas-student-direct-stream-sds": `
      <h2>Understanding the SDS Program</h2>
      <p>The Student Direct Stream (SDS) is Canada's fast-track student visa program designed to expedite the application process for students from certain countries. This program was introduced to streamline the visa process and reduce processing times for eligible international students.</p>

      <h2>Eligibility Requirements</h2>
      <p>To qualify for the SDS program, you must meet several criteria:</p>
      <ul>
        <li>Be a citizen of one of the eligible countries</li>
        <li>Have a valid acceptance letter from a designated learning institution</li>
        <li>Have a Guaranteed Investment Certificate (GIC) of CAD $10,000</li>
        <li>Meet the language proficiency requirements</li>
        <li>Have a clean medical examination</li>
      </ul>

      <h2>Processing Times</h2>
      <p>SDS applications are typically processed within 20 calendar days, compared to the standard 8-12 weeks for regular study permits. This makes it an attractive option for students who need to start their studies quickly.</p>

      <h2>Required Documents</h2>
      <p>Make sure you have all the necessary documents ready before applying:</p>
      <ul>
        <li>Valid passport</li>
        <li>Acceptance letter from a Canadian institution</li>
        <li>Proof of financial support</li>
        <li>Medical examination results</li>
        <li>Police certificate (if required)</li>
      </ul>
    `,
    "hidden-scholarships-for-international-students-in-australia": `
      <h2>Beyond the Obvious</h2>
      <p>While most international students are aware of the main scholarships offered by universities and the Australian government, there are many lesser-known funding opportunities that can significantly reduce your education costs.</p>

      <h2>Industry-Specific Scholarships</h2>
      <p>Many Australian companies offer scholarships to attract international talent in their field:</p>
      <ul>
        <li>Mining companies in Western Australia</li>
        <li>Technology firms in Sydney and Melbourne</li>
        <li>Agricultural organizations in regional areas</li>
        <li>Healthcare providers across major cities</li>
      </ul>

      <h2>Regional Scholarships</h2>
      <p>Australian states and territories offer targeted scholarships to attract international students to their regions:</p>
      <ul>
        <li>Victoria's Victoria India Doctoral Scholarships</li>
        <li>Queensland's Pacific Scholarships</li>
        <li>South Australia's Critical Industries Scholarships</li>
        <li>Western Australia's Premier's International Scholarship</li>
      </ul>

      <h2>Application Tips</h2>
      <p>When applying for these hidden scholarships:</p>
      <ul>
        <li>Research early - some deadlines are 6-12 months before course start</li>
        <li>Tailor your application to show how you benefit the sponsoring organization</li>
        <li>Network with alumni and current students</li>
        <li>Consider combining multiple scholarships</li>
      </ul>
    `,
    "cost-of-living-breakdown-london-vs-manchester": `
      <h2>Understanding Living Costs</h2>
      <p>When comparing London and Manchester, it's important to consider both the obvious differences and the hidden costs that can affect your budget as an international student.</p>

      <h2>Accommodation Costs</h2>
      <p>London's property market is notoriously expensive:</p>
      <ul>
        <li>Student halls: £150-£250 per week in London vs £120-£180 in Manchester</li>
        <li>Private rental: £800-£1,200/month in London vs £500-£800 in Manchester</li>
        <li>Shared house: £600-£900/month in London vs £400-£600 in Manchester</li>
      </ul>

      <h2>Transportation</h2>
      <p>Getting around London is more expensive but Manchester offers great value:</p>
      <ul>
        <li>Monthly student Oyster card: £80 in London</li>
        <li>Monthly student pass: £35 in Manchester</li>
        <li>Taxi/Uber: 20-30% cheaper in Manchester</li>
      </ul>

      <h2>Food and Groceries</h2>
      <p>Grocery costs are similar, but eating out varies significantly:</p>
      <ul>
        <li>Weekly groceries: £40-£60 in both cities</li>
        <li>Coffee: £3-£4 in London vs £2-£3 in Manchester</li>
        <li>Meal deal: £4-£5 in London vs £3-£4 in Manchester</li>
      </ul>

      <h2>Entertainment and Social Costs</h2>
      <p>Manchester often provides better value for student entertainment:</p>
      <ul>
        <li>Cinema tickets: £8-£12 in both cities</li>
        <li>Pub drinks: £4-£5 in London vs £3-£4 in Manchester</li>
        <li>Club entry: £10-£20 in London vs £5-£15 in Manchester</li>
      </ul>

      <h2>Final Thoughts</h2>
      <p>While London offers unparalleled opportunities and cultural experiences, Manchester provides excellent education at a significantly lower cost of living. Consider your priorities and budget when making your choice.</p>
    `,
    "top-5-universities-in-the-uk-for-computer-science": `
      <h2>Why Study Computer Science in the UK?</h2>
      <p>The UK has long been a global leader in technology education, with universities consistently ranking among the world's best for computer science programs. British institutions combine cutting-edge research with practical industry connections, preparing students for successful careers in tech.</p>

      <h2>University of Oxford - #1 for Research Excellence</h2>
      <p>Oxford's Department of Computer Science offers world-class research opportunities and maintains strong industry partnerships with companies like Google DeepMind and Microsoft Research.</p>
      <ul>
        <li>Duration: 3-4 years (BSc/MSc)</li>
        <li>Tuition: £9,250/year for UK students</li>
        <li>Entry Requirements: AAA-A*AA at A-level</li>
        <li>Graduate Outcomes: 95% employability rate</li>
      </ul>

      <h2>University of Cambridge - #2 for Innovation</h2>
      <p>Cambridge's Computer Laboratory is renowned for groundbreaking research in areas like machine learning, cybersecurity, and quantum computing.</p>
      <ul>
        <li>Duration: 3-4 years (BA/MPhil)</li>
        <li>Tuition: £9,250/year for UK students</li>
        <li>Entry Requirements: A*A*A-A*AA at A-level</li>
        <li>Graduate Outcomes: 94% employability rate</li>
      </ul>

      <h2>Imperial College London - #3 for Industry Connections</h2>
      <p>Located in the heart of London's tech scene, Imperial offers unparalleled access to internships and networking opportunities with top tech companies.</p>
      <ul>
        <li>Duration: 3-4 years (BSc/MSc)</li>
        <li>Tuition: £9,250/year for UK students</li>
        <li>Entry Requirements: AAA at A-level</li>
        <li>Graduate Outcomes: 96% employability rate</li>
      </ul>

      <h2>University College London (UCL) - #4 for Diversity</h2>
      <p>UCL's diverse student body and location in central London provide a vibrant learning environment with access to numerous tech events and meetups.</p>
      <ul>
        <li>Duration: 3-4 years (BSc/MSc)</li>
        <li>Tuition: £9,250/year for UK students</li>
        <li>Entry Requirements: AAA at A-level</li>
        <li>Graduate Outcomes: 93% employability rate</li>
      </ul>

      <h2>University of Edinburgh - #5 for Research Impact</h2>
      <p>Edinburgh's School of Informatics has made significant contributions to AI research and maintains strong connections with Scotland's growing tech sector.</p>
      <ul>
        <li>Duration: 4 years (BSc Honours)</li>
        <li>Tuition: £9,250/year for UK students</li>
        <li>Entry Requirements: AAA at A-level</li>
        <li>Graduate Outcomes: 92% employability rate</li>
      </ul>

      <h2>Post-Study Work Opportunities</h2>
      <p>UK graduates can benefit from the Graduate Route visa, allowing them to stay and work in the UK for up to 5 years after completing their degree. This provides valuable time to gain experience and potentially transition to skilled worker visas.</p>

      <h2>Career Prospects</h2>
      <p>Computer Science graduates from UK universities are highly sought after by employers worldwide. The average starting salary for CS graduates is £30,000-£45,000, with opportunities in:</p>
      <ul>
        <li>Software Development</li>
        <li>Data Science and Analytics</li>
        <li>Cybersecurity</li>
        <li>AI and Machine Learning</li>
        <li>FinTech and Blockchain</li>
      </ul>
    `,
    "student-visa-guide-for-uk-universities": `
      <h2>UK Student Visa Requirements</h2>
      <p>The UK student visa system has undergone significant changes. International students can now apply for a visa up to 6 months before their course start date, and the process is more streamlined than ever.</p>

      <h2>Visa Types</h2>
      <p>There are two main student visa routes:</p>
      <ul>
        <li><strong>Student Route:</strong> For full-time degree programs at UK universities</li>
        <li><strong>Child Student Route:</strong> For students under 18 studying at independent schools</li>
      </ul>

      <h2>Eligibility Criteria</h2>
      <p>To apply for a UK student visa, you must:</p>
      <ul>
        <li>Be over 16 years old</li>
        <li>Have been offered a place on a course by a licensed student sponsor</li>
        <li>Have enough money to support yourself (currently £1,334/month outside London)</li>
        <li>Speak, read, write, and understand English to the required level</li>
        <li>Be able to pay the visa application fee (£490)</li>
        <li>Be able to pay the Immigration Health Surcharge (£776/year)</li>
      </ul>

      <h2>Financial Requirements</h2>
      <p>You must prove you have enough money for your stay:</p>
      <ul>
        <li><strong>Outside London:</strong> £1,334 per month (£10,990 for 9 months)</li>
        <li><strong>London:</strong> £1,560 per month (£12,890 for 9 months)</li>
        <li>Additional funds required if bringing family members</li>
      </ul>

      <h2>English Language Requirements</h2>
      <p>You need to prove your English proficiency through:</p>
      <ul>
        <li>IELTS: Overall 5.5 (with no less than 5.5 in each component)</li>
        <li>TOEFL iBT: 72 overall</li>
        <li>PTE Academic: 59 overall</li>
        <li>Cambridge English: 162 overall</li>
      </ul>

      <h2>Application Process</h2>
      <p>Follow these steps to apply:</p>
      <ol>
        <li>Get your Confirmation of Acceptance for Studies (CAS)</li>
        <li>Prepare your documents and evidence</li>
        <li>Apply online through the UK government website</li>
        <li>Pay the visa fee and health surcharge</li>
        <li>Attend a visa appointment at a visa application center</li>
        <li>Wait for decision (usually 3 weeks)</li>
      </ol>

      <h2>Documents Required</h2>
      <p>Prepare these documents before applying:</p>
      <ul>
        <li>Valid passport</li>
        <li>CAS from your university</li>
        <li>Proof of financial support</li>
        <li>English language certificate</li>
        <li>Academic certificates</li>
        <li>TB test results (for some countries)</li>
        <li>Criminal record certificate (if required)</li>
      </ul>

      <h2>Post-Study Work Options</h2>
      <p>After completing your degree, you can apply for:</p>
      <ul>
        <li><strong>Graduate Route:</strong> Stay and work for up to 5 years (2 years for undergraduate degrees)</li>
        <li><strong>Skilled Worker Visa:</strong> If you find a job paying at least £25,600/year</li>
        <li><strong>Innovator Visa:</strong> For those starting innovative businesses</li>
      </ul>

      <h2>Visa Conditions</h2>
      <p>While studying in the UK, you must:</p>
      <ul>
        <li>Study at your sponsoring institution</li>
        <li>Not work more than 20 hours per week during term time</li>
        <li>Report any changes in circumstances</li>
        <li>Extend your visa if your course is longer than 5 years</li>
      </ul>

      <h2>Common Issues and Solutions</h2>
      <p>Be aware of these common challenges:</p>
      <ul>
        <li><strong>Visa Refusals:</strong> Usually due to insufficient funds or unclear documentation</li>
        <li><strong>Bank Statements:</strong> Must show regular income and sufficient savings</li>
        <li><strong>Course Changes:</strong> May require a new visa application</li>
      </ul>

      <h2>Timeline and Deadlines</h2>
      <p>Plan your timeline carefully:</p>
      <ul>
        <li>Apply up to 6 months before course start</li>
        <li>Apply at least 3 months before for most courses</li>
        <li>Processing time: 3-8 weeks depending on nationality</li>
        <li>Priority processing available for £1,000</li>
      </ul>
    `,
    "australia-vs-canada-which-is-better-for-international-students": `
      <h2>The Great Debate: Australia vs Canada</h2>
      <p>Both Australia and Canada have become top destinations for international students, each offering world-class education, diverse cultures, and post-study work opportunities. The choice between them depends on your academic goals, lifestyle preferences, and career aspirations.</p>

      <h2>Education Quality and Rankings</h2>
      <p>Both countries boast excellent universities:</p>
      <ul>
        <li><strong>Australia:</strong> 8 universities in the top 100 globally (QS World Rankings)</li>
        <li><strong>Canada:</strong> 3 universities in the top 100 globally</li>
        <li><strong>Similarities:</strong> Both offer internationally recognized degrees</li>
      </ul>

      <h2>Cost of Education</h2>
      <p>Tuition fees vary by program and institution:</p>
      <ul>
        <li><strong>Australia:</strong> AUD $20,000-45,000/year for undergraduate programs</li>
        <li><strong>Canada:</strong> CAD $15,000-30,000/year for undergraduate programs</li>
        <li><strong>Graduate Programs:</strong> Australia slightly more expensive</li>
      </ul>

      <h2>Cost of Living</h2>
      <p>Living expenses differ significantly:</p>
      <ul>
        <li><strong>Australia:</strong> AUD $21,041/year (outside major cities)</li>
        <li><strong>Canada:</strong> CAD $10,000-15,000/year (depending on province)</li>
        <li><strong>Major Cities:</strong> Sydney and Toronto are both expensive</li>
      </ul>

      <h2>Post-Study Work Opportunities</h2>
      <p>Both countries offer generous work options:</p>
      <ul>
        <li><strong>Australia:</strong> 2-4 years work visa depending on degree level</li>
        <li><strong>Canada:</strong> 1-3 years work visa depending on degree level</li>
        <li><strong>Pathways:</strong> Both offer pathways to permanent residency</li>
      </ul>

      <h2>Immigration and Settlement</h2>
      <p>Canada generally has more straightforward immigration:</p>
      <ul>
        <li><strong>Canada:</strong> Express Entry system, provincial programs</li>
        <li><strong>Australia:</strong> Points-tested system, state-sponsored visas</li>
        <li><strong>Processing Times:</strong> Canada generally faster</li>
      </ul>

      <h2>Weather and Lifestyle</h2>
      <p>Climate preferences may influence your decision:</p>
      <ul>
        <li><strong>Australia:</strong> Warm climate, beach culture, outdoor lifestyle</li>
        <li><strong>Canada:</strong> Four distinct seasons, multicultural cities</li>
        <li><strong>Both:</strong> Safe, welcoming societies with diverse populations</li>
      </ul>

      <h2>Popular Study Destinations</h2>
      <h3>Australia:</h3>
      <ul>
        <li>Sydney: Vibrant city life, business hub</li>
        <li>Melbourne: Cultural capital, coffee culture</li>
        <li>Brisbane: More affordable, growing tech scene</li>
        <li>Perth: Mining and resources focus</li>
      </ul>

      <h3>Canada:</h3>
      <ul>
        <li>Toronto: Financial capital, multicultural hub</li>
        <li>Vancouver: Natural beauty, tech innovation</li>
        <li>Montreal: European charm, bilingual environment</li>
        <li>Waterloo: Tech hub, university town</li>
      </ul>

      <h2>Employment Opportunities</h2>
      <p>Graduate employment rates are high in both countries:</p>
      <ul>
        <li><strong>Australia:</strong> 80-90% employment rate within 4 months</li>
        <li><strong>Canada:</strong> 85-95% employment rate within 6 months</li>
        <li><strong>Sectors:</strong> Both strong in tech, healthcare, and resources</li>
      </ul>

      <h2>Healthcare and Support Services</h2>
      <p>Both countries provide excellent student support:</p>
      <ul>
        <li><strong>Australia:</strong> Medicare access for international students</li>
        <li><strong>Canada:</strong> Provincial healthcare access in most provinces</li>
        <li><strong>OSHC:</strong> Required health insurance in both countries</li>
      </ul>

      <h2>Language and Communication</h2>
      <p>English is the primary language, but there are differences:</p>
      <ul>
        <li><strong>Australia:</strong> British-influenced English, laid-back communication</li>
        <li><strong>Canada:</strong> North American English, polite and formal</li>
        <li><strong>Both:</strong> Multicultural societies with excellent English support</li>
      </ul>

      <h2>Making Your Decision</h2>
      <p>Consider these factors when choosing:</p>
      <ul>
        <li><strong>Budget:</strong> Canada generally more affordable</li>
        <li><strong>Career Goals:</strong> Both offer excellent opportunities</li>
        <li><strong>Location Preference:</strong> Climate and lifestyle preferences</li>
        <li><strong>Immigration Plans:</strong> Canada may offer faster PR pathways</li>
        <li><strong>University Rankings:</strong> Australia has more top-ranked universities</li>
      </ul>

      <h2>Final Recommendations</h2>
      <p><strong>Choose Australia if:</strong></p>
      <ul>
        <li>You prefer warmer weather and beach lifestyle</li>
        <li>You want more top-ranked universities to choose from</li>
        <li>You like a more laid-back, Australian culture</li>
      </ul>

      <p><strong>Choose Canada if:</strong></p>
      <ul>
        <li>You want more affordable education and living costs</li>
        <li>You prefer colder climates with distinct seasons</li>
        <li>You have strong immigration goals</li>
        <li>You want potentially faster processing times</li>
      </ul>

      <h2>Both Are Excellent Choices</h2>
      <p>Ultimately, both Australia and Canada offer world-class education and are welcoming to international students. The "better" choice depends on your personal preferences, budget, and career goals. We recommend visiting both countries if possible, or speaking with alumni from your target universities to get firsthand insights.</p>
    `
  };
  return contents[slug] || "";
};

export default function BlogPostPage() {
  const { actions } = useBlogs();
  const params = useParams();
  const slug = params.slug as string;

  // Find the blog post by slug
  const article = actions.getBlogBySlug(slug);

  // If article not found, show 404
  if (!article) {
    notFound();
  }

  const content = getBlogContent(slug);

  return (
    <div className="bg-white min-h-screen font-sans">
      {/* Navigation */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <Link href="/blogs" className="inline-flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors">
          <ArrowLeft size={16} />
          Back to Blogs
        </Link>
      </div>

      {/* Article Header */}
      <article className="max-w-4xl mx-auto px-6 pb-20">
        <header className="mb-8">
          {/* Category Badge */}
          <span className="inline-block bg-green-500 text-white px-3 py-1 rounded-md text-sm font-bold uppercase mb-4">
            {article.category}
          </span>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
            {article.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-gray-500 mb-6">
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span>{article.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span>{article.readTime}</span>
            </div>
            {article.author && (
              <div className="flex items-center gap-3">
                <div className="relative w-8 h-8 rounded-full overflow-hidden">
                  <Image src={article.author.avatar} alt={article.author.name} fill className="object-cover" />
                </div>
                <div>
                  <p className="font-medium text-slate-900 text-sm">{article.author.name}</p>
                  <p className="text-xs">{article.author.role}</p>
                </div>
              </div>
            )}
          </div>

          {/* Featured Image */}
          <div className="relative h-64 md:h-96 w-full rounded-2xl overflow-hidden mb-8">
            <Image src={article.image} alt={article.title} fill className="object-cover" />
          </div>
        </header>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>

        {/* Share Section */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">Share this article:</span>
              <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                <Share2 size={16} />
              </button>
            </div>
            <Link href="/blogs" className="text-green-600 hover:text-green-700 font-medium">
              Read more articles →
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}

