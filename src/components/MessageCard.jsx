import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";
import Confetti from "./Confetti";
import "./MessageCard.css";

function MessageCard({ isActive }) {
  const [curtainsOpened, setCurtainsOpened] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const prevIsActive = useRef(isActive);

  const curtainLeftRef = useRef(null);
  const curtainRightRef = useRef(null);
  const curtainHintRef = useRef(null);
  const messageContentRef = useRef(null);
  const message = `My very very very very speciall GDG guyyy,my bbaaccchhuuuu, nd most importantly MY MR. SHREYAS MAJUNATAHA,
 i can't believe you are already 19 😭😭😭😭 dk why suddenly mom energy i am having but DAMN 😭😭😭😭😭,

 you have grown so much in the past yrs 🥹🥹🥹, and im proud of you!!!!, uk uk uk 
 seeing u grow frm a 15 yr old chotusa baccchuu to a 19 yr old feels like idk 😭😭
 u were 15 w a pineapple cut and now 19 w chidiya ka ghosla, thts sm great growth uk 😭😭 but yeh no jokes apart,
 this is ur last teenage year uk, ek yesr nd ull become a 20 bacchaa 🥹🥹 (olllddd aaajjjjaaaaa 😁😂)

 u went frm saying "ill drop out nd become f1 driver", to cracking mains, qualifying advance (WHICH EVEN IF U DONT AGREE IS DAMN COOL),
 and joining gdg (one of the highest rankin student club!!!!)

 seeing you grow aise makes me bery happy and very proud and i know for a fact ki future shreyas is goonnaa become a great prsn and
 achieve all his dreams!!

 keep working hard bacchuu and remember no matter what anyone says SHREYAS IS THE BEST!!(even if u dont believe it) 
       FAXS IS FAX AND YOU CANNOT CHANGE IT!!

 and smile more kiiiddddoooo, you lookkk sooo cutu while smiling 🫠🫠🫠🫠🫠 like a chotusa happy lil monkey 😭😭🫠🫠😭🫠😭🫠


 have an awesome year!! may all ur wishes come true!! and also do mistakes, learn frm em but never think of urself as meh or avg or anytg 
 IF U EVEN DARE TO DO SMTG LIKE THAT THEN U SEE!!!!!!!!

 remember kiddoooo no matter how old u grow you are still gonna be tht 15yr shreyas i met alomost 4 yrs ago for me, and no matter what 
 I ALWAYS TRUST YOU AND I AM VERY VERY PROUD OF YOU
 I AM GLAD TO HAVE YOU AS MY BOYFRIEND, I WISH ITS ME AND YOU IN EVERY LIFE 
 
 also abhi tho bass teen saal hue hai, ye annoyin bacchi is gonna annoy u for a lot more longerrr

 I LOVE YOU ALOT AND I SRSLY ADMIRE U HOW I ADMIRE THE MOON 

 keep growing successfulll aise hi!!!!but han uske saath TAKE CARE OF UR HEALTH ALSO, PAGALPANTI W HEALTH NAI CHALEGI!!!!!!

 HAPPPPYYYY 19 ONCEEE AGAINN SHREEUU 🥳🥳🥳🥳🥳🥳
 have an delightful day, a wonderful week, a marvelous month and a youthful year!!!!

 remember this bandi is always gonna be here no matter what 
 LOTS OF LOVVVEE 🫂🫂🫂🫂🫂🫂🫂🫂🫂🫂🫂🫂😘😘😘😘😘😘😘🥰🥰🥰🥰🥰🥰🥰🥰🥰🥰😘🥰😘
 YOU MEAN ALOT TO ME
 YOU MATTER ALOT TO ME 
 AND EVEN IF IT DOESNT SEEM LIKE IT BUT IM VERY VERY VERY PROUD OF YOU 
 AND YOU ARE A VERY VERY VERY VERY VERY SPECIAL KIIIDDDDDOOOOOO

 HAPPYYYY 19 MMMYYY (abhi thodu giggly giggly) MUSSCCLLEE DAADDDYYYY 🫂🫂🫂🫂🫂😘🥰🥰🥰🥰🫂🥰😘🫂🥰😘🫂😘😘🥰🫂

 its too late now i shld prolly sleep, varna ull scold me morning so..........

 .....singing off
 ~your laddooo 😽😽`;

  // Handle page transitions
  useEffect(() => {
    // Only trigger on transition to active
    if (isActive && !prevIsActive.current) {
      setTimeout(() => setShowConfetti(true), 10);
      const timer = setTimeout(() => setShowConfetti(false), 5000);
      prevIsActive.current = isActive;
      return () => clearTimeout(timer);
    }

    // Reset curtains when leaving page with smooth animation
    if (!isActive && prevIsActive.current) {
      setTimeout(() => {
        setCurtainsOpened(false);

        // Smooth reset animation
        if (curtainLeftRef.current && curtainRightRef.current) {
          const resetTimeline = gsap.timeline();

          resetTimeline.to([curtainLeftRef.current, curtainRightRef.current], {
            opacity: 1,
            duration: 0.3,
          });

          resetTimeline.to(
            [curtainLeftRef.current, curtainRightRef.current],
            {
              x: "0%",
              rotationY: 0,
              duration: 0.5,
              ease: "power2.inOut",
            },
            0.3
          );
        }

        if (messageContentRef.current) {
          gsap.to(messageContentRef.current, {
            opacity: 0,
            scale: 0.9,
            duration: 0.3,
          });
        }
      }, 300);
    }

    prevIsActive.current = isActive;
    return undefined;
  }, [isActive]);

  const handleOpenCurtains = () => {
    if (!curtainsOpened) {
      setCurtainsOpened(true);

      // Detect screen size for responsive animations
      const isMobile = window.innerWidth <= 768;
      const isSmallMobile = window.innerWidth <= 480;

      // Adjust animation parameters based on screen size
      const duration = isSmallMobile ? 1.2 : isMobile ? 1.4 : 1.5;
      const rotationAngle = isSmallMobile ? 10 : isMobile ? 12 : 15;

      // Animate curtain hint fade out
      gsap.to(curtainHintRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.4,
        ease: "power2.in",
      });

      // Animate curtains opening with 3D effect
      const timeline = gsap.timeline();

      timeline.to(
        curtainLeftRef.current,
        {
          x: "100%",
          rotationY: rotationAngle,
          duration: duration,
          ease: "power3.inOut",
        },
        0
      );

      timeline.to(
        curtainRightRef.current,
        {
          x: "-100%",
          rotationY: -rotationAngle,
          duration: duration,
          ease: "power3.inOut",
        },
        0
      );

      // Fade out curtains
      timeline.to(
        [curtainLeftRef.current, curtainRightRef.current],
        {
          opacity: 0,
          duration: 0.5,
          delay: isMobile ? 0.8 : 1,
        },
        0
      );

      // Reveal message content with smooth animation
      timeline.to(
        messageContentRef.current,
        {
          opacity: 1,
          scale: 1,
          duration: isMobile ? 0.8 : 1,
          ease: "back.out(1.2)",
          delay: isMobile ? 0.6 : 0.8,
        },
        0
      );
    }
  };

  // Handle touch events for mobile
  const handleTouchStart = () => {
    if (!curtainsOpened) {
      // Add subtle scale effect on touch
      gsap.to(curtainHintRef.current, {
        scale: 0.95,
        duration: 0.1,
      });
    }
  };

  const handleTouchEnd = () => {
    if (!curtainsOpened) {
      gsap.to(curtainHintRef.current, {
        scale: 1,
        duration: 0.1,
      });
    }
  };

  return (
    <section className="message">
      <h2>💌 A Message From My Heart</h2>

      <div className="curtain-container">
        <div className="curtain-rod"></div>

        <div
          className={`curtain-wrapper ${
            curtainsOpened ? "opened opening" : ""
          }`}
          onClick={handleOpenCurtains}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          role="button"
          tabIndex={curtainsOpened ? -1 : 0}
          aria-label="Click or tap to open the curtains and reveal the birthday message"
          onKeyDown={(e) => {
            if ((e.key === "Enter" || e.key === " ") && !curtainsOpened) {
              e.preventDefault();
              handleOpenCurtains();
            }
          }}
        >
          <div ref={curtainLeftRef} className="curtain curtain-left"></div>
          <div ref={curtainRightRef} className="curtain curtain-right"></div>
          {!curtainsOpened && (
            <div ref={curtainHintRef} className="curtain-hint">
              ✨ {window.innerWidth <= 768 ? "Tap" : "Click"} to Open ✨
            </div>
          )}
        </div>

        <div
          ref={messageContentRef}
          className="message-content"
          role="article"
          aria-label="Birthday message"
        >
          <p className="typed-text">{message}</p>
        </div>
      </div>

      {showConfetti && <Confetti />}
    </section>
  );
}

export default MessageCard;
