import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'

export const EmblaCarousel = ({children}) => {
  const [emblaRef] = useEmblaCarousel({slidesToScroll: 'auto', containScroll: 'trimSnaps'})

  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container">
        {children}
      </div>
    </div>
  )
}
