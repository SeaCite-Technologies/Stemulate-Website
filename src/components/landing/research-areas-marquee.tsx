import { FC } from "react"
import Marquee from "react-fast-marquee"
import { StaggerText } from "./stagger-text"

export const ResearchAreasMarquee: FC<{ areas: string[] }> = ({ areas }) => {
  const half = Math.ceil(areas.length / 2)
  const areas1 = areas.slice(0, half)
  const areas2 = areas.slice(half)

  return (
    <>
      <Marquee
        gradient={true}
        gradientColor="#171717"
        direction="right"
        speed={80}
      >
        {areas1.map((area, idx) => (
          <div
            key={idx}
            className="p-6 m-2 border-color-white rounded-2xl flex-shrink-0"
          >
            <i className="text-xl md:text-2xl font-medium">{area}</i>
          </div>
        ))}
      </Marquee>
      <Marquee
        gradient={true}
        gradientColor="#171717"
        direction="left"
        speed={80}
      >
        {areas2.map((area, idx) => (
          <div
            key={idx}
            className="p-6 m-2 border-color-white rounded-2xl flex-shrink-0"
          >
            <i className="text-xl md:text-2xl font-medium">
              <StaggerText text={area} />
            </i>
          </div>
        ))}
      </Marquee>
    </>
  )
}
