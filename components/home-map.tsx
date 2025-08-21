export function HomeMap() {
  return (
    <section className="w-full">
      <div className="w-full">
        <iframe
          title="Service Area Map"
          className="w-full h-[260px] sm:h-[320px] md:h-[380px] lg:h-[460px] border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3100.271271826629!2d-87.555!3d37.9716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8871f0561a1b7b75%3A0x0000000000000000!2sEvansville%2C%20IN!5e0!3m2!1sen!2sus!4v1700000000000"
          allowFullScreen
        />
      </div>
    </section>
  )
}

