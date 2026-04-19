export default function About() {
  return (
    <div className="min-h-screen bg-background p-6 md:p-10 max-w-5xl mx-auto text-foreground">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">About Us</h1>

      <p className="text-base md:text-lg mb-6">
        Looking for authentic Icelandic experiences? Much like our Viking
        forefathers, we crave adventures on the open sea. Experience
        unforgettable wildlife adventures aboard our luxury vessels.
      </p>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
        <p className="mb-4">
          Founded in 1996, Special Tours began as a Puffin Watching and School
          Trip Sea Tour operator. Over the years, we have grown into a leading
          provider of sea adventures in Reykjavík, offering Whale Watching,
          Puffin Tours, Sea Angling, and Northern Lights Excursions.
        </p>
        <p>
          We are proud to be pioneers in our field and to continuously expand
          our experiences while staying true to our roots.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Why We’re Special</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Attention to detail and authenticity</li>
          <li>Customer-first mindset</li>
          <li>Free Wi-Fi onboard</li>
          <li>Top-rated by travelers</li>
          <li>We respond to all customer feedback</li>
          <li>We go the extra mile for every guest</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Vision & Mission</h2>
        <p className="mb-4">
          We offer year-round sea adventures for individuals and groups,
          focusing on excellent service, competitive pricing, and unforgettable
          experiences.
        </p>
        <p className="mb-4">
          Our mission is to continuously improve our services while developing
          new and exciting tours. We aim to be a leading company in sustainable
          tourism in Iceland.
        </p>
        <p>
          We are committed to protecting the environment and supporting local
          communities while building strong relationships with our partners and
          customers.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Safety First</h2>
        <p className="mb-4">
          Your safety is our top priority. Our captains, engineers, and guides
          undergo extensive training to ensure every trip is safe and enjoyable.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>All safety regulations are strictly followed</li>
          <li>Experienced and highly trained crew members</li>
          <li>Certified maritime safety training for all staff</li>
          <li>Children under 12 must wear life jackets</li>
        </ul>
      </section>
    </div>
  );
}
