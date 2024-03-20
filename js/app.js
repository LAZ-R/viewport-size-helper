import { getRandomIntegerBetween, requestWakeLock, setHTMLTitle } from "./utils/utils.js";
import { APP_NAME, APP_VERSION } from "../properties.js";

/* ############################################################################
--------------------------------- CONSTANTES ---------------------------------
############################################################################ */


/* ############################################################################
---------------------------------- FONCTIONS ----------------------------------
############################################################################ */

// INTERACTIONS UTILISATEUR -------------------------------

const calculerRatio = (width, height) => {
    // Calcul du plus grand commun diviseur pour simplification de la fraction
    const pgcd = (a, b) => {
        return b === 0 ? a : pgcd(b, a % b);
    }

    // Calcul du ratio en tant que fraction
    const gcd = pgcd(width, height);
    const ratioWidth = width / gcd;
    const ratioHeight = height / gcd;

    // Renvoie l'objet contenant les ratios
    return { width: ratioWidth, height: ratioHeight };
}

// GÉNÉRATION DOM -----------------------------------------
const setSizes = () => {
  const horizontalArrow = document.getElementById('horizontalArrow');
  const verticalArrow = document.getElementById('verticalArrow');

  const hasVerticalScrollBar = horizontalArrow.offsetWidth != window.innerWidth;
  const hasHorizontalScrollBar = verticalArrow.offsetHeight != window.innerHeight;

  const visibleWidth = hasVerticalScrollBar ? horizontalArrow.offsetWidth : window.innerWidth;
  const visibleHeight = hasHorizontalScrollBar ? verticalArrow.offsetHeight : window.innerHeight;

  const ratio = calculerRatio(window.innerWidth, window.innerHeight);

  document.getElementById('infosBloc').innerHTML = `
    <span>Viewport size<br><b>${window.innerWidth}px x ${window.innerHeight}px</b></span>
    <span>Ratio<br><b>${ratio.width}:${ratio.height}</b></span>
   `;

  document.getElementById('width').innerHTML = `${hasVerticalScrollBar ? `<b>${window.innerWidth}px</b> (without scrollbar : ${visibleWidth}px)` : `<b>${visibleWidth}px</b>`}`;
  document.getElementById('height').innerHTML = `${hasHorizontalScrollBar ? `<b>${window.innerHeight}px</b> (without scrollbar : ${visibleHeight}px)` : `<b>${visibleHeight}px</b>`}`;
}

/* ############################################################################
---------------------------------- EXECUTION ----------------------------------
############################################################################ */

// Auto ---------------------------------------------------
//await requestWakeLock();

// Manuelle -----------------------------------------------
setHTMLTitle(APP_NAME);
setSizes();
window.addEventListener('resize', setSizes);