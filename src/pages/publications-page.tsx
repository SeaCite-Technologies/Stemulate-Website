import { StandartLayout } from "@/layout/navbar"

const publications = [
  {
    name: "Relevance and impact of neurography in Kazakhstan",
    student: "Alsana",
    pdfLink: "/papers/Paper_Alsana.pdf",
    presentationLink: "/pdf/presentation1.pdf",
  },
  {
    name: `Do the changes in human microbiome affect the development of autoimmune
diseases and can the study of these changes fundamentally alter treatment protocols
and approaches to autoimmune diseases?`,
    student: "Amina Smak",
    pdfLink: "/papers/Paper_Amina_Smak.pdf",
    presentationLink: "/pdf/presentation2.pdf",
  },
  {
    name: `Why does Kazakhstan have a more developed startup ecosystem
than Kyrgyzstan, although both share a similar Soviet past?`,
    student: "Amir Bushumbayev",
    pdfLink: "/papers/Paper_Amir_Bushumbayev.pdf",
    presentationLink: "/pdf/presentation2.pdf",
  },
  {
    name: `Why is Kazakhstani education system in public schools not as
successful in promoting creativity compared to specialized/private schools?`,
    student: "Aruzhan Olzhabay",
    pdfLink: "/papers/Paper_Aruzhan_Olzhabay.pdf",
    presentationLink: "/pdf/presentation2.pdf",
  },
  {
    name: `How do migraines affect the brain and our cognitive skills?`,
    student: "Bolat Leila",
    pdfLink: "/papers/Paper_Bolat_Leila.pdf",
    presentationLink: "/pdf/presentation2.pdf",
  },
  {
    name: `How can dynamic pricing models be successfully implemented into
digital marketplaces to benefit SMEs in Kazakhstan?`,
    student: "Safiyakhon Zulfikarova",
    pdfLink: "/papers/Paper_Safiyakhon_Zulfikarova.pdf",
    presentationLink: "/pdf/presentation2.pdf",
  },
  {
    name: `Explainable AI in Healthcare: Interpreting Machine Learning’s
Dementia Classification On Imbalanced Multi-Domain Clinical Data`,
    student: "Tuan Anh Ngo",
    pdfLink: "/papers/Paper_TuanAnhNgo.pdf",
    presentationLink: "/pdf/presentation2.pdf",
  },
  {
    name: `Hosting the Olympics: a comparative study of developed and
developing economies.`,
    student: "Yesseniya Zhumagatova",
    pdfLink: "/papers/Paper_Yesseniya_Zhumagatova.pdf",
    presentationLink: "/pdf/presentation2.pdf",
  },
]

const PublicationsPageContent = () => {
  return (
    <main className="min-h-screen bg-white text-black py-24 px-4 md:px-8 flex-col items-center">
      <div className="max-w-5xl mx-auto space-y-8">
        <p className="font-bold text-3xl sm:text-4xl md:text-5xl">
          Publications
        </p>
        <ul className="space-y-8">
          {publications.map((pub, index) => (
            <li key={index} className="text-lg md:text-xl">
              "<i>{pub.name}</i>"" by{" "}
              <i>
                <b>{pub.student}</b>
              </i>{" "}
              -{" "}
              <a
                href={pub.pdfLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                [paper]
              </a>{" "}
              <a
                href={pub.presentationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                [presentation]
              </a>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}

export const PublicationsPage: React.FC = () => (
  <StandartLayout>
    <PublicationsPageContent />
  </StandartLayout>
)
