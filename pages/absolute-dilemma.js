const { useEffect, useState, useRef, useMemo } = require("react");
const { BsArrowDown } = require("react-icons/bs");
const { AiOutlineExclamationCircle } = require("react-icons/ai");
import Link from "next/link.js";


export default function Lezardrieux() {
  const [chuncks, setChuncks] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState("");
  const [loadedCanvas, setLoadedCanvas] = useState(false);
  const [insertedIndex, setInsertedIndex] = useState(0);
  const [insertedIndexToCheck, setInsertedIndexToCheck] = useState(0);
  const [isNumberValid, setIsNumberValid] = useState(true);
  const [manualSearch, setManualSearch] = useState(false);
  const [showButtonMarketplace, setShowButtonMarketplace] = useState(false);

   const linkMarketplace = require("../components/link_absolute-dilemma.js");
  //console.log("linkMarketplace", linkMarketplace);

  function handleSelectedIndex(n) {
    setSelectedIndex(n);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setManualSearch(false);
    setIsNumberValid(true);
    setInsertedIndex(0);
  }

  const handleInsertedIndex = (_event) => {
    setInsertedIndexToCheck(Number.parseInt(_event.target.value));
  };

  function handleManualSearchAppear() {
    setSelectedIndex("");
    setManualSearch(true);
    setInsertedIndex(0);
    setShowButtonMarketplace(false);
  }

  function handleGoSearch() {
    if (insertedIndexToCheck > 0 && insertedIndexToCheck < 100) {
      setIsNumberValid(true);
      setInsertedIndex(insertedIndexToCheck);
      window.scrollTo(0, document.body.scrollHeight);
      setShowButtonMarketplace(true);
    } else {
      setIsNumberValid(false);
      setShowButtonMarketplace(false);
    }
  }

  const canvasRef = useRef();
  const imageRef = useRef();

  const splitImageInNParts = (url) => {
    const image = new Image();
    image.src = url;

    image.onload = () => {
      const canvas = canvasRef.current;

      const nCol = 9;
      const nRow = 11;

      canvas.width = image.width / nCol;
      canvas.height = image.height / nRow;

      const context = canvas.getContext("2d");

      const chuncks = [];

      for (let i = 0; i < nRow; i++) {
        const r = [];
        for (let j = 0; j < nCol; j++) {
          context.drawImage(
            image,
            j * canvas.width,
            i * canvas.height,
            canvas.width,
            canvas.height,
            0,
            0,
            canvas.width,
            canvas.height
          );
          r.push(canvas.toDataURL());
        }
        chuncks.push(r);
      }
      setChuncks(chuncks);
    };
  };

  useEffect(() => {
    if (chuncks.length > 0) return setChuncks([...chuncks]);
    splitImageInNParts("/absolute-dilemma.jpeg");
  }, []);

  //  useEffect(() => {
  //     console.log("insertedIndex", insertedIndex);
  //   },[insertedIndex]);

  // useEffect(() => {
  //   handleGoSearch();
  // },[insertedIndexToCheck]);

  return (
    <div className="flex flex-col justify-between min-h-screen">
      {/* Logo TopBar */}
      <div className="w-full bg-[#F1F2F2] shadow-xl">
        <Link href="/">
          <img className="py-6 mx-auto cursor-pointer" src="/logo.png" alt="" />
        </Link>{" "}
      </div>

      {/* Body */}
      <div className="mt-4 bg-white ">
        {/* Artista e Collezione */}
        <div className="text-center sm:py-4 sm:space-y-4">
          <p className="text-xl font-semibold sm:text-6xl font-Caslon">
          Jason Balducci
          </p>
          <p className="text-lg sm:text-5xl font-Caslon">Absolute Dilemma</p>
        </div>

        <div className="items-center justify-around pt-2 mx-4 sm:flex sm:justify-center sm:pt-6">
          {/* Quadro intero */}
          <img
            className={` sm:w-1/2 border-0 border-black ${
              loadedCanvas ? "hidden" : "block "
            } `}
            src="/absolute-dilemma.jpeg"
            alt="absolute-dilemma"
            ref={imageRef}
          />

          <div className="relative flex flex-col items-center mx-10 mt-4 text-center">
            {!selectedIndex && loadedCanvas && !manualSearch && (
              <>
                <p className="text-sm sm:text-2xl">
                  <u>Click on</u> the canvas below to find the Phygital
                  masterpiece.
                </p>
                <p className="py-2 text-sm sm:text-2xl">OR</p>

                <p className="text-sm sm:text-2xl">
                  <u>Insert</u> the piece number you are looking for:
                </p>

                <div className="flex pt-2 mt-1 rounded-md shadow-sm ">
                  <input
                    onChange={handleInsertedIndex}
                    type="text"
                    name="pieceNumber"
                    id="pieceNumber-1"
                    className="flex px-3 py-2 text-center border border-gray-300 rounded-l-md sm:text-sm"
                    placeholder="1 - 99"
                  />
                  <span
                    onClick={handleGoSearch}
                    className="inline-flex items-center px-3 text-sm text-gray-500 border border-gray-300 cursor-pointer hover:underline rounded-r-md bg-gray-50"
                  >
                    GO
                  </span>
                </div>

                <p
                  className={`mt-2 text-sm text-red-600 ${
                    isNumberValid ? "hidden" : "block"
                  } `}
                >
                  The number must be between 1 and 99{" "}
                </p>
                {/* <a
                    href={linkMarketplace[insertedIndex - 1]}
                    target="_blank"
                    rel="noreferrer"
                    className={`mt-2 px-14 py-2 item-center border rounded-lg text-white bg-black hover:underline cursor-pointer ${
                      showButtonMarketplace && linkMarketplace[insertedIndex - 1] != ""
                        ? "block"
                        : "hidden"
                    }  `}
                  >
                    Go to Markeplace
                  </a> */}
                <p
                  className={`${
                    linkMarketplace[insertedIndex - 1] === ""
                      ? "pt-2 block"
                      : "hidden"
                  }`}
                >
                  Sorry, this piece is not on sale yet.
                </p>
              </>
            )}

            {!selectedIndex && loadedCanvas && !manualSearch && (
              <BsArrowDown className="mt-4 text-xl sm:text-5xl" />
            )}

            <div
              className={`text-xl animate-pulse ${
                loadedCanvas
                  ? "hidden"
                  : "block border-2 border-black/80 rounded-lg text-sm sm:text-xl px-6 py-4"
              }`}
            >
              Just a few seconds...
              <span className="block pt-2">The picture is loading...</span>
            </div>

            {/* Risultato ricerca col Click */}
            {selectedIndex && (
              <>
                <div className="z-10 px-8 py-6 space-y-2 text-xl bg-white border-2 border-black rounded-lg">
                  <p className="">Your desired masterpiece is:</p>
                  <p className="font-bold">{selectedIndex} / 99</p>

                  <a
                    href={linkMarketplace[selectedIndex - 1]}
                    target="_blank"
                    rel="noreferrer"
                    className={` py-2 item-center border rounded-lg text-white bg-black hover:underline cursor-pointer ${
                      linkMarketplace[selectedIndex - 1] === ""
                        ? "hidden"
                        : "block"
                    }  `}
                  >
                    Go to Markeplace
                  </a>
                  <p
                    className={`${
                      linkMarketplace[selectedIndex - 1] === ""
                        ? "block"
                        : "hidden"
                    }`}
                  >
                    Sorry, this piece is not on sale yet.
                  </p>

                  <p
                    onClick={handleManualSearchAppear}
                    className="underline cursor-pointer hover:font-bold"
                  >
                    Piece Number Search
                  </p>
                </div>

                <div className="absolute animate-blob top-0 bg-[#B37854] -left-4 rounded-full w-44 h-44 mix-blend-multiply blur-xl filter opacity-70"></div>
                <div className="absolute animation-delay-2000 animate-blob del bg-[#D5BD98] -right-4 rounded-full w-44 h-44 mix-blend-multiply opacity-70 blur-xl filter "></div>
                <div className="absolute animation-delay-4000 animate-blob top-0 bg-[#756D68] -bottom-8 left-20 rounded-full w-44 h-44 opacity-70 mix-blend-multiply blur-xl filter "></div>
              </>
            )}

            {/* Risultato ricerca con ricerca numero */}
            {manualSearch && (
              <>
                <div className="z-10 px-2 py-6 space-y-2 text-xl bg-white border-2 border-black rounded-lg sm:px-8">
                  <p className="text-sm sm:text-xl">
                    {" "}
                    <u>Insert</u> the piece number you are looking for:
                  </p>

                  <div className="flex px-4 pt-2 mt-1 rounded-md shadow-sm">
                    <input
                      onChange={handleInsertedIndex}
                      type="text"
                      name="pieceNumber"
                      id="pieceNumber-2"
                      className="flex-1 px-3 py-2 text-sm text-center border border-gray-300 rounded-l-md sm:text-xl"
                      placeholder="1 - 99"
                    />
                    <span
                      onClick={handleGoSearch}
                      className="inline-flex items-center px-3 text-sm text-gray-500 border border-gray-300 cursor-pointer hover:underline rounded-r-md bg-gray-50"
                    >
                      GO
                    </span>
                  </div>

                  <p
                    className={`mt-2 text-sm text-red-600 ${
                      isNumberValid ? "hidden" : "block"
                    } `}
                  >
                    The number must be between 1 and 99{" "}
                  </p>
                  <a
                    href={linkMarketplace[insertedIndex - 1]}
                    target="_blank"
                    rel="noreferrer"
                    className={`mx-4 py-2 item-center border rounded-lg text-white bg-black hover:underline cursor-pointer ${
                      showButtonMarketplace &&
                      linkMarketplace[insertedIndex - 1] != ""
                        ? "block"
                        : "hidden"
                    }  `}
                  >
                    Go to Markeplace
                  </a>
                  <p
                    className={`${
                      linkMarketplace[insertedIndex - 1] === ""
                        ? "block"
                        : "hidden"
                    }`}
                  >
                    Sorry, this piece is not on sale yet.
                  </p>
                </div>

                <div className="absolute animate-blob top-0 bg-[#B37854] -left-4 rounded-full w-44 h-44 mix-blend-multiply blur-xl filter opacity-70"></div>
                <div className="absolute animation-delay-2000 animate-blob del bg-[#D5BD98] -right-4 rounded-full w-44 h-44 mix-blend-multiply opacity-70 blur-xl filter "></div>
                <div className="absolute animation-delay-4000 animate-blob top-0 bg-[#756D68] -bottom-8 left-20 rounded-full w-44 h-44 opacity-70 mix-blend-multiply blur-xl filter "></div>
              </>
            )}
          </div>
        </div>

        <canvas id="canvas" ref={canvasRef} className="hidden " />

        <div className="pb-10 mx-10" onLoad={() => setLoadedCanvas(true)}>
          <table className="mx-auto mt-10 border-4 border-black table-auto">
            {chuncks.map((row, i) => (
              <tr key={i}>
                {row.map((chunck, j) => (
                  <td
                    key={j + 1 + i * 9}
                    id={j + 1 + i * 9}
                    onClick={() => handleSelectedIndex(j + 1 + i * 9)}
                    className={`sm:p-0.5 hover:scale-[1.8] hover:cursor-pointer ${
                      insertedIndex === j + 1 + i * 9 ? "scale-[2] " : ""
                    } `}
                  >
                    <img key={j} src={chunck} width={80} alt="piece" />
                  </td>
                ))}
              </tr>
            ))}
          </table>
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
