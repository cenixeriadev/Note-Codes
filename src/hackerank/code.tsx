import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SyntaxHighlighter from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Link } from "react-router-dom";

const Hack = () => {
  const { id } = useParams();
  const [hacks, setHacks] = useState({});

  useEffect(() => {
    fetch(`https://nexus-api-note-co-78.deno.dev/codes/hackerank/${id}`)
      .then(async (res) => await res.json())
      .then(([json]) => setHacks(json));

    // console.log(hacks);
  }, []);
  const eliminar = () => {
    // console.log(dato);
    fetch(`https://nexus-api-note-co-78.deno.dev/codes/hackerank/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          console.log("Problem found");
          return;
        }
        return res.json();
      })
      .then((data) => console.log(data))
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className=" bg-gradient-to-t from-teal-950 to-black min-h-screen gap-8 text-white py-10">
      <div>
        <h1 className="text-[50px] font-extrabold lg:text-[50px] text-center">
          {hacks.name}
        </h1>
        <p className="font-normal  text-white/70 text-center m-4">
          {hacks.original}
        </p>
        <h1 className="text-[15px] font-normal lg:text-[15px] text-center">
          {hacks.description}
        </h1>
      </div>
      <div className="flex place-content-center m-2 gap-2">
        <button
          onClick={() => {
            navigator.clipboard.writeText(hacks.solution);
          }}
          className=" border-2 w-fit border-white py-2 hover:bg-white  hover:text-black  px-3 rounded-2xl  text-[15px]"
        >
          Copy
        </button>
        <Link
          to={`/hackerank/`}
          onClick={() => {
            eliminar();
          }}
        >
          <div className="border-2 border-white py-2 hover:bg-white  hover:text-black  px-3 rounded-2xl  w-fit text-[15px]">
            Eliminar
          </div>
        </Link>
      </div>
      <div className="grid place-items-center grid-flow-row lg:grid-flow-col lg:px-20 h-full gap-3 lg:gap-7 text-center mt-5">
        <div className="bg-green-900/20  border-4 border-emerald-300 h-full w-[calc(100%-80px)] overflow-auto lg:w-full content-center rounded-2xl text-[20px] lg:text-[30px] font-bold">
          <div className="text-left text-[15px] border rounded-2xl  ">
            <SyntaxHighlighter
              language="cpp"
              style={nightOwl}
              showLineNumbers
            >
              {hacks.solution}
            </SyntaxHighlighter>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Hack;
