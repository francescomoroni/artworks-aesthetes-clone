import { useRouter } from "next/router";
import Link from "next/link";

export default function Home() {
  const router = useRouter();

  // useEffect(() => {
  //   router.push("/lezardrieux", "/lezardrieux");
  // }, []);

  const operas = [
    {
      id: 1,
      title: "Lezardrieux",
      artist: "Paul Signac",
      image: "./signac.jpg",
      linkPage: "/lezardrieux",
    },
    {
      id: 2,
      title: "Niçoise en costume local",
      artist: "Berthe Morisot",
      image: "./nicosie.jpg",
      linkPage: "/nicoise",
    },
    {
      id: 3,
      title: "Absolute Dilemma",
      artist: "Jason Balducci",
      image: "./absolute-dilemma.jpeg",
      linkPage: "/absolute-dilemma",
    },
    {
      id: 4,
      title: "Appropriazione La Dama con l'Ermellino",
      artist: "Enzo Fiore",
      image: "./appropriazione.png",
      linkPage: "/appropriazione",
    },
  ];

  return (
    <div className="flex flex-col justify-between min-h-screen bg-black">
      {/* TobBar Logo */}
      <div className="w-full bg-[#F1F2F2] shadow-xl">
        <Link href="/">
          <img
            className="py-6 mx-auto cursor-pointer "
            src="/logo.png"
            alt=""
          />
        </Link>

        <div className="px-4 py-10 space-y-6 text-center text-white bg-black">
          <p className="text-lg sm:text-2xl lg:text-5xl">
            WHERE FINE ART MEETS THE XRPL
          </p>
          <p className="text-lg sm:text-2xl lg:text-5xl text-white/80 font-Caslon">
            Explore our collection{" "}
          </p>
        </div>
      </div>

      <div className="flex flex-col flex-1 px-10 pb-10 space-y-10 text-white lg:flex-none">
        <div className="grid grid-cols-1 pt-4 mx-auto gap-y-8 lg:grid-cols-3 sm:gap-6 lg:gap-10">
          {operas.map((opera) => (
            <div key={opera.id}>
              <Link href={opera.linkPage}
              >
                <img
                  src={opera.image}
                  className="object-cover mx-auto border border-black rounded-lg cursor-pointer w-60 lg:w-80 lg:h-80 xl:w-96 xl:h-96 h-60"
                />
              
              </Link>
              <div className="flex flex-col justify-between pt-4 tracking-wider text-center">
                <p className="sm:text-xl">{opera.artist}</p>
                <p className="font-bold sm:text-xl">{opera.title}</p>
                <a
                  href={`https://artworks-aesthetes-clone.vercel.app${opera.linkPage}`}
                >
                  {" "}
                  <p className="py-2 mt-4 tracking-widest border border-white rounded-full cursor-pointer hover:underline">
                    Details
                  </p>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="text-white bg-black">
        <p className="py-4 text-xs text-center sm:text-base ">
          Copyright © 2022 Aesthetes S.r.l. - P.I. 12066980967
        </p>
      </div>
    </div>
  );
}
