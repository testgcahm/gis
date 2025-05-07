'use client';
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function NotificationPopup() {
  const [show, setShow] = useState(false);
  const [enlarged, setEnlarged] = useState(false);
  let display = true;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('hideEventNotification') !== '1' && display) {
        setShow(true);
      }
    }
  }, []);

  if (!show) return null;

  return (
    <>
      {enlarged && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80" onClick={() => setEnlarged(false)}>
          <img
            src="/delay.jpg"
            alt="Event Postponed"
            className="max-w-[90vw] max-h-[90vh] rounded-xl shadow-2xl border-4 border-white"
            onClick={e => e.stopPropagation()}
          />
          <button
            className="absolute top-6 right-8 text-white text-3xl font-bold bg-black/60 rounded-full px-3 py-1 hover:bg-black/80 transition"
            onClick={() => setEnlarged(false)}
            aria-label="Close image preview"
          >
            &times;
          </button>
        </div>
      )}
      <div className="fixed inset-0 z-50 flex items-start justify-center min-h-screen bg-black/50 bg-opacity-60 overflow-auto">
        <div className="relative bg-white rounded-lg shadow-lg max-w-lg w-full p-8 border border-gray-200 flex flex-col items-center my-8">
          <button
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl"
            onClick={() => setShow(false)}
            aria-label="Close notification"
          >
            &times;
          </button>
          <div className="flex flex-col items-center w-full">
            <Image
              src="/delay.jpg"
              alt="Event Postponed"
              width={600}
              height={300}
              className="rounded mb-4 object-contain cursor-zoom-in"
              onClick={() => setEnlarged(true)}
              priority
            />
            <h2 className="text-lg font-bold text-center mb-2 text-primary">Assalamualaikum!!</h2>
            <p className="text-center text-base mb-2 font-arabic">لا تقنطو من رحمت اللہ</p>
            <p className="text-center text-sm mb-2">{`فَاِنَّ مَعَ الْعُسْرِ یُسْرًا: تو بیشک مشکل کے ساتھ آسانی ہے`}</p>
            <p className="text-justify text-sm mb-2">
              🔘Last night our all preparations were completed & we were very happy k ..we ان شاءاللہ are going to Host this Mega Event tomorrow in GMCTH Auditorium.But then all of sudden ...kya se kya ho gae situation pta hi nae chla.
            </p>
            <p className="text-justify text-sm mb-2">
              Although still we/the executive cabinet of GMC Islamic society are very Clueless about Future of Our event BUT we will strive our best to figure it out as soon as COUNTRY'S situation GETS NORMALIZED & will make sure k GMC Islamic society ne Islamic Fiesta'25 k liye jo hardwork kiya h since about 2months....wo zaaya na ho.
            </p>
            <p className="text-justify text-sm mb-2">
              Allah ki traf se jo hota h behtar hota h & یقیناً is mein koi na koi behtari hi ho gi.
            </p>
            <p className="text-center text-sm mb-2">اللہ ھمارا حامی وناصر ہو <br/>Ameen.<br/>Jazakallah khair .</p>
            <Link href="/events/islamic-fiesta" className="mt-3 inline-block px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition">More details</Link>
            <button
              className="mt-4 px-4 py-2 bg-red-500 hover:bg-red-700 font-semibold rounded text-white transition"
              onClick={() => {
                setShow(false);
                if (typeof window !== 'undefined') {
                  localStorage.setItem('hideEventNotification', '1');
                }
              }}
            >
              Don't display again
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
