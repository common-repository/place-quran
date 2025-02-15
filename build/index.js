/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/edit.js":
/*!*********************!*\
  !*** ./src/edit.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Edit)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _quran_data__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./quran-data */ "./src/quran-data.js");
/* harmony import */ var _edit_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./edit.scss */ "./src/edit.scss");








function Edit({
  attributes,
  setAttributes
}) {
  const {
    url,
    surah,
    verse,
    translation,
    size,
    alignment
  } = attributes;
  const [invalidVerse, setInvalidVerse] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_4__.useDebounce)(() => triggerChange(), 1000), [verse]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    triggerChange();
  }, [surah, translation, size]);
  const options = _quran_data__WEBPACK_IMPORTED_MODULE_5__.Sura.slice(1, 115).map((s, index) => ({
    value: index + 1,
    label: `${index + 1} ${s[5]} (${s[1]})`
  }));
  const translationOptions = [{
    value: "en",
    label: "English"
  }, {
    value: "ms",
    label: "Malay"
  }, {
    value: "id",
    label: "Indonesia"
  }, {
    value: "tr",
    label: "Turkish"
  }, {
    value: "ur",
    label: "Urdu"
  }, {
    value: "hi",
    label: "Hindi"
  }];
  const validatedVerse = verses => {
    try {
      if (/[^\d,-\s]/.test(verses) || /(^|[,-])\s*([,-]|$)/.test(verses)) {
        throw new Error("Invalid verses");
      }
      const res = verses.replace(" ", "").split(",").flatMap(num => {
        if (num.includes("-")) {
          const [from, to] = num.split("-").map(num => parseInt(num));
          if (from > to) {
            throw new Error("Invalid verses");
          }
          return Array(to - from + 1).fill(0).map((_, idx) => from + idx);
        }
        return parseInt(num);
      });
      return res;
    } catch {
      setInvalidVerse(true);
      return false;
    }
  };
  const triggerChange = () => {
    if (!surah || !verse) {
      return;
    }
    if (validatedVerse(verse)) {
      const newUrl = `https://placequran.com/${size !== "auto" ? size + "/" : ""}${surah}/${verse}/ar${translation.length == 0 ? "" : "," + translation.join(",")}`;
      if (newUrl !== url) {
        setLoading(true);
        setAttributes({
          url: newUrl
        });
      }
      setInvalidVerse(false);
    }
  };
  const onImageLoad = () => {
    setLoading(false);
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    ...(0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useBlockProps)(),
    style: {
      textAlign: alignment
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InspectorControls, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
    title: "Settings"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ComboboxControl, {
    label: "Surah",
    value: surah,
    onChange: x => setAttributes({
      surah: x
    }),
    options: options
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextControl, {
    help: "Range and/or comma separated. eg: 1-5,7",
    label: `Verses ${invalidVerse ? "- Invalid" : ""}`,
    value: verse,
    onChange: x => setAttributes({
      verse: x
    }),
    className: invalidVerse ? "invalid" : ""
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.FormTokenField, {
    __experimentalAutoSelectFirstMatch: true,
    __experimentalExpandOnFocus: true,
    label: "Translations (max: 2)",
    onChange: translations => setAttributes({
      translation: translations.map(x => translationOptions.find(y => y.label == x).value)
    }),
    suggestions: translationOptions.map(({
      label
    }) => label),
    value: translation.map(x => translationOptions.find(y => y.value == x).label)
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.SelectControl, {
    label: "Size",
    help: "Adaptive will adjust the size according to the viewing device.",
    value: size,
    onChange: x => setAttributes({
      size: x
    }),
    options: [{
      disabled: true,
      label: "Select a size",
      value: ""
    }, {
      label: "Adaptive (auto)",
      value: "auto"
    }, {
      label: "Small",
      value: "s"
    }, {
      label: "Medium",
      value: "m"
    }, {
      label: "Large",
      value: "l"
    }]
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.BlockControls, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToolbarGroup, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.AlignmentToolbar, {
    value: alignment,
    onChange: x => setAttributes({
      alignment: x
    })
  }))), url ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: url,
    onLoad: onImageLoad
  }) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      border: "2px dashed #b9b9b9",
      borderRadius: "7px",
      backgroundColor: "#ededed",
      height: "80px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "#666666"
    }
  }, "Select surah and verse from the sidebar"), loading && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    style: {
      backgroundColor: "black",
      opacity: 0.6,
      position: "absolute",
      width: "100%",
      height: "100%",
      top: 0,
      left: 0,
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: "loader"
  })));
}

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.scss */ "./src/style.scss");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edit */ "./src/edit.js");
/* harmony import */ var _save__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./save */ "./src/save.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./block.json */ "./src/block.json");





(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_4__.name, {
  edit: _edit__WEBPACK_IMPORTED_MODULE_2__["default"],
  save: _save__WEBPACK_IMPORTED_MODULE_3__["default"]
});

/***/ }),

/***/ "./src/quran-data.js":
/*!***************************!*\
  !*** ./src/quran-data.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HizbQaurter: () => (/* binding */ HizbQaurter),
/* harmony export */   Juz: () => (/* binding */ Juz),
/* harmony export */   Manzil: () => (/* binding */ Manzil),
/* harmony export */   Page: () => (/* binding */ Page),
/* harmony export */   Ruku: () => (/* binding */ Ruku),
/* harmony export */   Sajda: () => (/* binding */ Sajda),
/* harmony export */   Sura: () => (/* binding */ Sura)
/* harmony export */ });
// Quran Metadata (ver 1.0)
// Copyright (C) 2008-2009 Tanzil.info
// License: Creative Commons Attribution 3.0

//------------------ Sura Data ---------------------

const Sura = [
// [start, ayas, order, rukus, name, tname, ename, type]
[], [0, 7, 5, 1, "Ø§Ù„ÙØ§ØªØ­Ø©", "Al-Faatiha", "The Opening", "Meccan"], [7, 286, 87, 40, "Ø§Ù„Ø¨Ù‚Ø±Ø©", "Al-Baqara", "The Cow", "Medinan"], [293, 200, 89, 20, "Ø¢Ù„ Ø¹Ù…Ø±Ø§Ù†", "Aal-i-Imraan", "The Family of Imraan", "Medinan"], [493, 176, 92, 24, "Ø§Ù„Ù†Ø³Ø§Ø¡", "An-Nisaa", "The Women", "Medinan"], [669, 120, 112, 16, "Ø§Ù„Ù…Ø§Ø¦Ø¯Ø©", "Al-Maaida", "The Table", "Medinan"], [789, 165, 55, 20, "Ø§Ù„Ø£Ù†Ø¹Ø§Ù…", "Al-An'aam", "The Cattle", "Meccan"], [954, 206, 39, 24, "Ø§Ù„Ø£Ø¹Ø±Ø§Ù", "Al-A'raaf", "The Heights", "Meccan"], [1160, 75, 88, 10, "Ø§Ù„Ø£Ù†ÙØ§Ù„", "Al-Anfaal", "The Spoils of War", "Medinan"], [1235, 129, 113, 16, "Ø§Ù„ØªÙˆØ¨Ø©", "At-Tawba", "The Repentance", "Medinan"], [1364, 109, 51, 11, "ÙŠÙˆÙ†Ø³", "Yunus", "Jonas", "Meccan"], [1473, 123, 52, 10, "Ù‡ÙˆØ¯", "Hud", "Hud", "Meccan"], [1596, 111, 53, 12, "ÙŠÙˆØ³Ù", "Yusuf", "Joseph", "Meccan"], [1707, 43, 96, 6, "Ø§Ù„Ø±Ø¹Ø¯", "Ar-Ra'd", "The Thunder", "Medinan"], [1750, 52, 72, 7, "Ø§Ø¨Ø±Ø§Ù‡ÙŠÙ…", "Ibrahim", "Abraham", "Meccan"], [1802, 99, 54, 6, "Ø§Ù„Ø­Ø¬Ø±", "Al-Hijr", "The Rock", "Meccan"], [1901, 128, 70, 16, "Ø§Ù„Ù†Ø­Ù„", "An-Nahl", "The Bee", "Meccan"], [2029, 111, 50, 12, "Ø§Ù„Ø¥Ø³Ø±Ø§Ø¡", "Al-Israa", "The Night Journey", "Meccan"], [2140, 110, 69, 12, "Ø§Ù„ÙƒÙ‡Ù", "Al-Kahf", "The Cave", "Meccan"], [2250, 98, 44, 6, "Ù…Ø±ÙŠÙ…", "Maryam", "Mary", "Meccan"], [2348, 135, 45, 8, "Ø·Ù‡", "Taa-Haa", "Taa-Haa", "Meccan"], [2483, 112, 73, 7, "Ø§Ù„Ø£Ù†Ø¨ÙŠØ§Ø¡", "Al-Anbiyaa", "The Prophets", "Meccan"], [2595, 78, 103, 10, "Ø§Ù„Ø­Ø¬", "Al-Hajj", "The Pilgrimage", "Medinan"], [2673, 118, 74, 6, "Ø§Ù„Ù…Ø¤Ù…Ù†ÙˆÙ†", "Al-Muminoon", "The Believers", "Meccan"], [2791, 64, 102, 9, "Ø§Ù„Ù†ÙˆØ±", "An-Noor", "The Light", "Medinan"], [2855, 77, 42, 6, "Ø§Ù„ÙØ±Ù‚Ø§Ù†", "Al-Furqaan", "The Criterion", "Meccan"], [2932, 227, 47, 11, "Ø§Ù„Ø´Ø¹Ø±Ø§Ø¡", "Ash-Shu'araa", "The Poets", "Meccan"], [3159, 93, 48, 7, "Ø§Ù„Ù†Ù…Ù„", "An-Naml", "The Ant", "Meccan"], [3252, 88, 49, 8, "Ø§Ù„Ù‚ØµØµ", "Al-Qasas", "The Stories", "Meccan"], [3340, 69, 85, 7, "Ø§Ù„Ø¹Ù†ÙƒØ¨ÙˆØª", "Al-Ankaboot", "The Spider", "Meccan"], [3409, 60, 84, 6, "Ø§Ù„Ø±ÙˆÙ…", "Ar-Room", "The Romans", "Meccan"], [3469, 34, 57, 3, "Ù„Ù‚Ù…Ø§Ù†", "Luqman", "Luqman", "Meccan"], [3503, 30, 75, 3, "Ø§Ù„Ø³Ø¬Ø¯Ø©", "As-Sajda", "The Prostration", "Meccan"], [3533, 73, 90, 9, "Ø§Ù„Ø£Ø­Ø²Ø§Ø¨", "Al-Ahzaab", "The Clans", "Medinan"], [3606, 54, 58, 6, "Ø³Ø¨Ø¥", "Saba", "Sheba", "Meccan"], [3660, 45, 43, 5, "ÙØ§Ø·Ø±", "Faatir", "The Originator", "Meccan"], [3705, 83, 41, 5, "ÙŠØ³", "Yaseen", "Yaseen", "Meccan"], [3788, 182, 56, 5, "Ø§Ù„ØµØ§ÙØ§Øª", "As-Saaffaat", "Those drawn up in Ranks", "Meccan"], [3970, 88, 38, 5, "Øµ", "Saad", "The letter Saad", "Meccan"], [4058, 75, 59, 8, "Ø§Ù„Ø²Ù…Ø±", "Az-Zumar", "The Groups", "Meccan"], [4133, 85, 60, 9, "ØºØ§ÙØ±", "Al-Ghaafir", "The Forgiver", "Meccan"], [4218, 54, 61, 6, "ÙØµÙ„Øª", "Fussilat", "Explained in detail", "Meccan"], [4272, 53, 62, 5, "Ø§Ù„Ø´ÙˆØ±Ù‰", "Ash-Shura", "Consultation", "Meccan"], [4325, 89, 63, 7, "Ø§Ù„Ø²Ø®Ø±Ù", "Az-Zukhruf", "Ornaments of gold", "Meccan"], [4414, 59, 64, 3, "Ø§Ù„Ø¯Ø®Ø§Ù†", "Ad-Dukhaan", "The Smoke", "Meccan"], [4473, 37, 65, 4, "Ø§Ù„Ø¬Ø§Ø«ÙŠØ©", "Al-Jaathiya", "Crouching", "Meccan"], [4510, 35, 66, 4, "Ø§Ù„Ø£Ø­Ù‚Ø§Ù", "Al-Ahqaf", "The Dunes", "Meccan"], [4545, 38, 95, 4, "Ù…Ø­Ù…Ø¯", "Muhammad", "Muhammad", "Medinan"], [4583, 29, 111, 4, "Ø§Ù„ÙØªØ­", "Al-Fath", "The Victory", "Medinan"], [4612, 18, 106, 2, "Ø§Ù„Ø­Ø¬Ø±Ø§Øª", "Al-Hujuraat", "The Inner Apartments", "Medinan"], [4630, 45, 34, 3, "Ù‚", "Qaaf", "The letter Qaaf", "Meccan"], [4675, 60, 67, 3, "Ø§Ù„Ø°Ø§Ø±ÙŠØ§Øª", "Adh-Dhaariyat", "The Winnowing Winds", "Meccan"], [4735, 49, 76, 2, "Ø§Ù„Ø·ÙˆØ±", "At-Tur", "The Mount", "Meccan"], [4784, 62, 23, 3, "Ø§Ù„Ù†Ø¬Ù…", "An-Najm", "The Star", "Meccan"], [4846, 55, 37, 3, "Ø§Ù„Ù‚Ù…Ø±", "Al-Qamar", "The Moon", "Meccan"], [4901, 78, 97, 3, "Ø§Ù„Ø±Ø­Ù…Ù†", "Ar-Rahmaan", "The Beneficent", "Medinan"], [4979, 96, 46, 3, "Ø§Ù„ÙˆØ§Ù‚Ø¹Ø©", "Al-Waaqia", "The Inevitable", "Meccan"], [5075, 29, 94, 4, "Ø§Ù„Ø­Ø¯ÙŠØ¯", "Al-Hadid", "The Iron", "Medinan"], [5104, 22, 105, 3, "Ø§Ù„Ù…Ø¬Ø§Ø¯Ù„Ø©", "Al-Mujaadila", "The Pleading Woman", "Medinan"], [5126, 24, 101, 3, "Ø§Ù„Ø­Ø´Ø±", "Al-Hashr", "The Exile", "Medinan"], [5150, 13, 91, 2, "Ø§Ù„Ù…Ù…ØªØ­Ù†Ø©", "Al-Mumtahana", "She that is to be examined", "Medinan"], [5163, 14, 109, 2, "Ø§Ù„ØµÙ", "As-Saff", "The Ranks", "Medinan"], [5177, 11, 110, 2, "Ø§Ù„Ø¬Ù…Ø¹Ø©", "Al-Jumu'a", "Friday", "Medinan"], [5188, 11, 104, 2, "Ø§Ù„Ù…Ù†Ø§ÙÙ‚ÙˆÙ†", "Al-Munaafiqoon", "The Hypocrites", "Medinan"], [5199, 18, 108, 2, "Ø§Ù„ØªØºØ§Ø¨Ù†", "At-Taghaabun", "Mutual Disillusion", "Medinan"], [5217, 12, 99, 2, "Ø§Ù„Ø·Ù„Ø§Ù‚", "At-Talaaq", "Divorce", "Medinan"], [5229, 12, 107, 2, "Ø§Ù„ØªØ­Ø±ÙŠÙ…", "At-Tahrim", "The Prohibition", "Medinan"], [5241, 30, 77, 2, "Ø§Ù„Ù…Ù„Ùƒ", "Al-Mulk", "The Sovereignty", "Meccan"], [5271, 52, 2, 2, "Ø§Ù„Ù‚Ù„Ù…", "Al-Qalam", "The Pen", "Meccan"], [5323, 52, 78, 2, "Ø§Ù„Ø­Ø§Ù‚Ø©", "Al-Haaqqa", "The Reality", "Meccan"], [5375, 44, 79, 2, "Ø§Ù„Ù…Ø¹Ø§Ø±Ø¬", "Al-Ma'aarij", "The Ascending Stairways", "Meccan"], [5419, 28, 71, 2, "Ù†ÙˆØ­", "Nooh", "Noah", "Meccan"], [5447, 28, 40, 2, "Ø§Ù„Ø¬Ù†", "Al-Jinn", "The Jinn", "Meccan"], [5475, 20, 3, 2, "Ø§Ù„Ù…Ø²Ù…Ù„", "Al-Muzzammil", "The Enshrouded One", "Meccan"], [5495, 56, 4, 2, "Ø§Ù„Ù…Ø¯Ø«Ø±", "Al-Muddaththir", "The Cloaked One", "Meccan"], [5551, 40, 31, 2, "Ø§Ù„Ù‚ÙŠØ§Ù…Ø©", "Al-Qiyaama", "The Resurrection", "Meccan"], [5591, 31, 98, 2, "Ø§Ù„Ø§Ù†Ø³Ø§Ù†", "Al-Insaan", "Man", "Medinan"], [5622, 50, 33, 2, "Ø§Ù„Ù…Ø±Ø³Ù„Ø§Øª", "Al-Mursalaat", "The Emissaries", "Meccan"], [5672, 40, 80, 2, "Ø§Ù„Ù†Ø¨Ø¥", "An-Naba", "The Announcement", "Meccan"], [5712, 46, 81, 2, "Ø§Ù„Ù†Ø§Ø²Ø¹Ø§Øª", "An-Naazi'aat", "Those who drag forth", "Meccan"], [5758, 42, 24, 1, "Ø¹Ø¨Ø³", "Abasa", "He frowned", "Meccan"], [5800, 29, 7, 1, "Ø§Ù„ØªÙƒÙˆÙŠØ±", "At-Takwir", "The Overthrowing", "Meccan"], [5829, 19, 82, 1, "Ø§Ù„Ø¥Ù†ÙØ·Ø§Ø±", "Al-Infitaar", "The Cleaving", "Meccan"], [5848, 36, 86, 1, "Ø§Ù„Ù…Ø·ÙÙÙŠÙ†", "Al-Mutaffifin", "Defrauding", "Meccan"], [5884, 25, 83, 1, "Ø§Ù„Ø¥Ù†Ø´Ù‚Ø§Ù‚", "Al-Inshiqaaq", "The Splitting Open", "Meccan"], [5909, 22, 27, 1, "Ø§Ù„Ø¨Ø±ÙˆØ¬", "Al-Burooj", "The Constellations", "Meccan"], [5931, 17, 36, 1, "Ø§Ù„Ø·Ø§Ø±Ù‚", "At-Taariq", "The Morning Star", "Meccan"], [5948, 19, 8, 1, "Ø§Ù„Ø£Ø¹Ù„Ù‰", "Al-A'laa", "The Most High", "Meccan"], [5967, 26, 68, 1, "Ø§Ù„ØºØ§Ø´ÙŠØ©", "Al-Ghaashiya", "The Overwhelming", "Meccan"], [5993, 30, 10, 1, "Ø§Ù„ÙØ¬Ø±", "Al-Fajr", "The Dawn", "Meccan"], [6023, 20, 35, 1, "Ø§Ù„Ø¨Ù„Ø¯", "Al-Balad", "The City", "Meccan"], [6043, 15, 26, 1, "Ø§Ù„Ø´Ù…Ø³", "Ash-Shams", "The Sun", "Meccan"], [6058, 21, 9, 1, "Ø§Ù„Ù„ÙŠÙ„", "Al-Lail", "The Night", "Meccan"], [6079, 11, 11, 1, "Ø§Ù„Ø¶Ø­Ù‰", "Ad-Dhuhaa", "The Morning Hours", "Meccan"], [6090, 8, 12, 1, "Ø§Ù„Ø´Ø±Ø­", "Ash-Sharh", "The Consolation", "Meccan"], [6098, 8, 28, 1, "Ø§Ù„ØªÙŠÙ†", "At-Tin", "The Fig", "Meccan"], [6106, 19, 1, 1, "Ø§Ù„Ø¹Ù„Ù‚", "Al-Alaq", "The Clot", "Meccan"], [6125, 5, 25, 1, "Ø§Ù„Ù‚Ø¯Ø±", "Al-Qadr", "The Power, Fate", "Meccan"], [6130, 8, 100, 1, "Ø§Ù„Ø¨ÙŠÙ†Ø©", "Al-Bayyina", "The Evidence", "Medinan"], [6138, 8, 93, 1, "Ø§Ù„Ø²Ù„Ø²Ù„Ø©", "Az-Zalzala", "The Earthquake", "Medinan"], [6146, 11, 14, 1, "Ø§Ù„Ø¹Ø§Ø¯ÙŠØ§Øª", "Al-Aadiyaat", "The Chargers", "Meccan"], [6157, 11, 30, 1, "Ø§Ù„Ù‚Ø§Ø±Ø¹Ø©", "Al-Qaari'a", "The Calamity", "Meccan"], [6168, 8, 16, 1, "Ø§Ù„ØªÙƒØ§Ø«Ø±", "At-Takaathur", "Competition", "Meccan"], [6176, 3, 13, 1, "Ø§Ù„Ø¹ØµØ±", "Al-Asr", "The Declining Day, Epoch", "Meccan"], [6179, 9, 32, 1, "Ø§Ù„Ù‡Ù…Ø²Ø©", "Al-Humaza", "The Traducer", "Meccan"], [6188, 5, 19, 1, "Ø§Ù„ÙÙŠÙ„", "Al-Fil", "The Elephant", "Meccan"], [6193, 4, 29, 1, "Ù‚Ø±ÙŠØ´", "Quraish", "Quraysh", "Meccan"], [6197, 7, 17, 1, "Ø§Ù„Ù…Ø§Ø¹ÙˆÙ†", "Al-Maa'un", "Almsgiving", "Meccan"], [6204, 3, 15, 1, "Ø§Ù„ÙƒÙˆØ«Ø±", "Al-Kawthar", "Abundance", "Meccan"], [6207, 6, 18, 1, "Ø§Ù„ÙƒØ§ÙØ±ÙˆÙ†", "Al-Kaafiroon", "The Disbelievers", "Meccan"], [6213, 3, 114, 1, "Ø§Ù„Ù†ØµØ±", "An-Nasr", "Divine Support", "Medinan"], [6216, 5, 6, 1, "Ø§Ù„Ù…Ø³Ø¯", "Al-Masad", "The Palm Fibre", "Meccan"], [6221, 4, 22, 1, "Ø§Ù„Ø¥Ø®Ù„Ø§Øµ", "Al-Ikhlaas", "Sincerity", "Meccan"], [6225, 5, 20, 1, "Ø§Ù„ÙÙ„Ù‚", "Al-Falaq", "The Dawn", "Meccan"], [6230, 6, 21, 1, "Ø§Ù„Ù†Ø§Ø³", "An-Naas", "Mankind", "Meccan"], [6236, 1]];

//------------------ Juz Data ---------------------

const Juz = [
// [sura, aya]
[], [1, 1], [2, 142], [2, 253], [3, 93], [4, 24], [4, 148], [5, 82], [6, 111], [7, 88], [8, 41], [9, 93], [11, 6], [12, 53], [15, 1], [17, 1], [18, 75], [21, 1], [23, 1], [25, 21], [27, 56], [29, 46], [33, 31], [36, 28], [39, 32], [41, 47], [46, 1], [51, 31], [58, 1], [67, 1], [78, 1], [115, 1]];

//------------------ Hizb Data ---------------------

const HizbQaurter = [
// [sura, aya]
[], [1, 1], [2, 26], [2, 44], [2, 60], [2, 75], [2, 92], [2, 106], [2, 124], [2, 142], [2, 158], [2, 177], [2, 189], [2, 203], [2, 219], [2, 233], [2, 243], [2, 253], [2, 263], [2, 272], [2, 283], [3, 15], [3, 33], [3, 52], [3, 75], [3, 93], [3, 113], [3, 133], [3, 153], [3, 171], [3, 186], [4, 1], [4, 12], [4, 24], [4, 36], [4, 58], [4, 74], [4, 88], [4, 100], [4, 114], [4, 135], [4, 148], [4, 163], [5, 1], [5, 12], [5, 27], [5, 41], [5, 51], [5, 67], [5, 82], [5, 97], [5, 109], [6, 13], [6, 36], [6, 59], [6, 74], [6, 95], [6, 111], [6, 127], [6, 141], [6, 151], [7, 1], [7, 31], [7, 47], [7, 65], [7, 88], [7, 117], [7, 142], [7, 156], [7, 171], [7, 189], [8, 1], [8, 22], [8, 41], [8, 61], [9, 1], [9, 19], [9, 34], [9, 46], [9, 60], [9, 75], [9, 93], [9, 111], [9, 122], [10, 11], [10, 26], [10, 53], [10, 71], [10, 90], [11, 6], [11, 24], [11, 41], [11, 61], [11, 84], [11, 108], [12, 7], [12, 30], [12, 53], [12, 77], [12, 101], [13, 5], [13, 19], [13, 35], [14, 10], [14, 28], [15, 1], [15, 50], [16, 1], [16, 30], [16, 51], [16, 75], [16, 90], [16, 111], [17, 1], [17, 23], [17, 50], [17, 70], [17, 99], [18, 17], [18, 32], [18, 51], [18, 75], [18, 99], [19, 22], [19, 59], [20, 1], [20, 55], [20, 83], [20, 111], [21, 1], [21, 29], [21, 51], [21, 83], [22, 1], [22, 19], [22, 38], [22, 60], [23, 1], [23, 36], [23, 75], [24, 1], [24, 21], [24, 35], [24, 53], [25, 1], [25, 21], [25, 53], [26, 1], [26, 52], [26, 111], [26, 181], [27, 1], [27, 27], [27, 56], [27, 82], [28, 12], [28, 29], [28, 51], [28, 76], [29, 1], [29, 26], [29, 46], [30, 1], [30, 31], [30, 54], [31, 22], [32, 11], [33, 1], [33, 18], [33, 31], [33, 51], [33, 60], [34, 10], [34, 24], [34, 46], [35, 15], [35, 41], [36, 28], [36, 60], [37, 22], [37, 83], [37, 145], [38, 21], [38, 52], [39, 8], [39, 32], [39, 53], [40, 1], [40, 21], [40, 41], [40, 66], [41, 9], [41, 25], [41, 47], [42, 13], [42, 27], [42, 51], [43, 24], [43, 57], [44, 17], [45, 12], [46, 1], [46, 21], [47, 10], [47, 33], [48, 18], [49, 1], [49, 14], [50, 27], [51, 31], [52, 24], [53, 26], [54, 9], [55, 1], [56, 1], [56, 75], [57, 16], [58, 1], [58, 14], [59, 11], [60, 7], [62, 1], [63, 4], [65, 1], [66, 1], [67, 1], [68, 1], [69, 1], [70, 19], [72, 1], [73, 20], [75, 1], [76, 19], [78, 1], [80, 1], [82, 1], [84, 1], [87, 1], [90, 1], [94, 1], [100, 9], [115, 1]];

//------------------ Manzil Data ---------------------

const Manzil = [
// [sura, aya]
[], [1, 1], [5, 1], [10, 1], [17, 1], [26, 1], [37, 1], [50, 1]];

//------------------ Ruku Data ---------------------

const Ruku = [
// [sura, aya]
[], [1, 1], [2, 1], [2, 8], [2, 21], [2, 30], [2, 40], [2, 47], [2, 60], [2, 62], [2, 72], [2, 83], [2, 87], [2, 97], [2, 104], [2, 113], [2, 122], [2, 130], [2, 142], [2, 148], [2, 153], [2, 164], [2, 168], [2, 177], [2, 183], [2, 189], [2, 197], [2, 211], [2, 217], [2, 222], [2, 229], [2, 232], [2, 236], [2, 243], [2, 249], [2, 254], [2, 258], [2, 261], [2, 267], [2, 274], [2, 282], [2, 284], [3, 1], [3, 10], [3, 21], [3, 31], [3, 42], [3, 55], [3, 64], [3, 72], [3, 81], [3, 92], [3, 102], [3, 110], [3, 121], [3, 130], [3, 144], [3, 149], [3, 156], [3, 172], [3, 181], [3, 190], [4, 1], [4, 11], [4, 15], [4, 23], [4, 26], [4, 34], [4, 43], [4, 51], [4, 60], [4, 71], [4, 77], [4, 88], [4, 92], [4, 97], [4, 101], [4, 105], [4, 113], [4, 116], [4, 127], [4, 135], [4, 142], [4, 153], [4, 163], [4, 172], [5, 1], [5, 6], [5, 12], [5, 20], [5, 27], [5, 35], [5, 44], [5, 51], [5, 57], [5, 67], [5, 78], [5, 87], [5, 94], [5, 101], [5, 109], [5, 116], [6, 1], [6, 11], [6, 21], [6, 31], [6, 42], [6, 51], [6, 56], [6, 61], [6, 71], [6, 83], [6, 91], [6, 95], [6, 101], [6, 111], [6, 122], [6, 130], [6, 141], [6, 145], [6, 151], [6, 155], [7, 1], [7, 11], [7, 26], [7, 32], [7, 40], [7, 48], [7, 54], [7, 59], [7, 65], [7, 73], [7, 85], [7, 94], [7, 100], [7, 109], [7, 127], [7, 130], [7, 142], [7, 148], [7, 152], [7, 158], [7, 163], [7, 172], [7, 182], [7, 189], [8, 1], [8, 11], [8, 20], [8, 29], [8, 38], [8, 45], [8, 49], [8, 59], [8, 65], [8, 70], [9, 1], [9, 7], [9, 17], [9, 25], [9, 30], [9, 38], [9, 43], [9, 60], [9, 67], [9, 73], [9, 81], [9, 90], [9, 100], [9, 111], [9, 119], [9, 123], [10, 1], [10, 11], [10, 21], [10, 31], [10, 41], [10, 54], [10, 61], [10, 71], [10, 83], [10, 93], [10, 104], [11, 1], [11, 9], [11, 25], [11, 36], [11, 50], [11, 61], [11, 69], [11, 84], [11, 96], [11, 110], [12, 1], [12, 7], [12, 21], [12, 30], [12, 36], [12, 43], [12, 50], [12, 58], [12, 69], [12, 80], [12, 94], [12, 105], [13, 1], [13, 8], [13, 19], [13, 27], [13, 32], [13, 38], [14, 1], [14, 7], [14, 13], [14, 22], [14, 28], [14, 35], [14, 42], [15, 1], [15, 16], [15, 26], [15, 45], [15, 61], [15, 80], [16, 1], [16, 10], [16, 22], [16, 26], [16, 35], [16, 41], [16, 51], [16, 61], [16, 66], [16, 71], [16, 77], [16, 84], [16, 90], [16, 101], [16, 111], [16, 120], [17, 1], [17, 11], [17, 23], [17, 31], [17, 41], [17, 53], [17, 61], [17, 71], [17, 78], [17, 85], [17, 94], [17, 101], [18, 1], [18, 13], [18, 18], [18, 23], [18, 32], [18, 45], [18, 50], [18, 54], [18, 60], [18, 71], [18, 83], [18, 102], [19, 1], [19, 16], [19, 41], [19, 51], [19, 66], [19, 83], [20, 1], [20, 25], [20, 55], [20, 77], [20, 90], [20, 105], [20, 116], [20, 129], [21, 1], [21, 11], [21, 30], [21, 42], [21, 51], [21, 76], [21, 94], [22, 1], [22, 11], [22, 23], [22, 26], [22, 34], [22, 39], [22, 49], [22, 58], [22, 65], [22, 73], [23, 1], [23, 23], [23, 33], [23, 51], [23, 78], [23, 93], [24, 1], [24, 11], [24, 21], [24, 27], [24, 35], [24, 41], [24, 51], [24, 58], [24, 62], [25, 1], [25, 10], [25, 21], [25, 35], [25, 45], [25, 61], [26, 1], [26, 10], [26, 34], [26, 53], [26, 70], [26, 105], [26, 123], [26, 141], [26, 160], [26, 176], [26, 192], [27, 1], [27, 15], [27, 32], [27, 45], [27, 59], [27, 67], [27, 83], [28, 1], [28, 14], [28, 22], [28, 29], [28, 43], [28, 51], [28, 61], [28, 76], [29, 1], [29, 14], [29, 23], [29, 31], [29, 45], [29, 52], [29, 64], [30, 1], [30, 11], [30, 20], [30, 28], [30, 41], [30, 54], [31, 1], [31, 12], [31, 20], [32, 1], [32, 12], [32, 23], [33, 1], [33, 9], [33, 21], [33, 28], [33, 35], [33, 41], [33, 53], [33, 59], [33, 69], [34, 1], [34, 10], [34, 22], [34, 31], [34, 37], [34, 46], [35, 1], [35, 8], [35, 15], [35, 27], [35, 38], [36, 1], [36, 13], [36, 33], [36, 51], [36, 68], [37, 1], [37, 22], [37, 75], [37, 114], [37, 139], [38, 1], [38, 15], [38, 27], [38, 41], [38, 65], [39, 1], [39, 10], [39, 22], [39, 32], [39, 42], [39, 53], [39, 64], [39, 71], [40, 1], [40, 10], [40, 21], [40, 28], [40, 38], [40, 51], [40, 61], [40, 69], [40, 79], [41, 1], [41, 9], [41, 19], [41, 26], [41, 33], [41, 45], [42, 1], [42, 10], [42, 20], [42, 30], [42, 44], [43, 1], [43, 16], [43, 26], [43, 36], [43, 46], [43, 57], [43, 68], [44, 1], [44, 30], [44, 43], [45, 1], [45, 12], [45, 22], [45, 27], [46, 1], [46, 11], [46, 21], [46, 27], [47, 1], [47, 12], [47, 20], [47, 29], [48, 1], [48, 11], [48, 18], [48, 27], [49, 1], [49, 11], [50, 1], [50, 16], [50, 30], [51, 1], [51, 24], [51, 47], [52, 1], [52, 29], [53, 1], [53, 26], [53, 33], [54, 1], [54, 23], [54, 41], [55, 1], [55, 26], [55, 46], [56, 1], [56, 39], [56, 75], [57, 1], [57, 11], [57, 20], [57, 26], [58, 1], [58, 7], [58, 14], [59, 1], [59, 11], [59, 18], [60, 1], [60, 7], [61, 1], [61, 10], [62, 1], [62, 9], [63, 1], [63, 9], [64, 1], [64, 11], [65, 1], [65, 8], [66, 1], [66, 8], [67, 1], [67, 15], [68, 1], [68, 34], [69, 1], [69, 38], [70, 1], [70, 36], [71, 1], [71, 21], [72, 1], [72, 20], [73, 1], [73, 20], [74, 1], [74, 32], [75, 1], [75, 31], [76, 1], [76, 23], [77, 1], [77, 41], [78, 1], [78, 31], [79, 1], [79, 27], [80, 1], [81, 1], [82, 1], [83, 1], [84, 1], [85, 1], [86, 1], [87, 1], [88, 1], [89, 1], [90, 1], [91, 1], [92, 1], [93, 1], [94, 1], [95, 1], [96, 1], [97, 1], [98, 1], [99, 1], [100, 1], [101, 1], [102, 1], [103, 1], [104, 1], [105, 1], [106, 1], [107, 1], [108, 1], [109, 1], [110, 1], [111, 1], [112, 1], [113, 1], [114, 1]];

//------------------ Page Data ---------------------

const Page = [
// [sura, aya]
[], [1, 1], [2, 1], [2, 6], [2, 17], [2, 25], [2, 30], [2, 38], [2, 49], [2, 58], [2, 62], [2, 70], [2, 77], [2, 84], [2, 89], [2, 94], [2, 102], [2, 106], [2, 113], [2, 120], [2, 127], [2, 135], [2, 142], [2, 146], [2, 154], [2, 164], [2, 170], [2, 177], [2, 182], [2, 187], [2, 191], [2, 197], [2, 203], [2, 211], [2, 216], [2, 220], [2, 225], [2, 231], [2, 234], [2, 238], [2, 246], [2, 249], [2, 253], [2, 257], [2, 260], [2, 265], [2, 270], [2, 275], [2, 282], [2, 283], [3, 1], [3, 10], [3, 16], [3, 23], [3, 30], [3, 38], [3, 46], [3, 53], [3, 62], [3, 71], [3, 78], [3, 84], [3, 92], [3, 101], [3, 109], [3, 116], [3, 122], [3, 133], [3, 141], [3, 149], [3, 154], [3, 158], [3, 166], [3, 174], [3, 181], [3, 187], [3, 195], [4, 1], [4, 7], [4, 12], [4, 15], [4, 20], [4, 24], [4, 27], [4, 34], [4, 38], [4, 45], [4, 52], [4, 60], [4, 66], [4, 75], [4, 80], [4, 87], [4, 92], [4, 95], [4, 102], [4, 106], [4, 114], [4, 122], [4, 128], [4, 135], [4, 141], [4, 148], [4, 155], [4, 163], [4, 171], [4, 176], [5, 3], [5, 6], [5, 10], [5, 14], [5, 18], [5, 24], [5, 32], [5, 37], [5, 42], [5, 46], [5, 51], [5, 58], [5, 65], [5, 71], [5, 77], [5, 83], [5, 90], [5, 96], [5, 104], [5, 109], [5, 114], [6, 1], [6, 9], [6, 19], [6, 28], [6, 36], [6, 45], [6, 53], [6, 60], [6, 69], [6, 74], [6, 82], [6, 91], [6, 95], [6, 102], [6, 111], [6, 119], [6, 125], [6, 132], [6, 138], [6, 143], [6, 147], [6, 152], [6, 158], [7, 1], [7, 12], [7, 23], [7, 31], [7, 38], [7, 44], [7, 52], [7, 58], [7, 68], [7, 74], [7, 82], [7, 88], [7, 96], [7, 105], [7, 121], [7, 131], [7, 138], [7, 144], [7, 150], [7, 156], [7, 160], [7, 164], [7, 171], [7, 179], [7, 188], [7, 196], [8, 1], [8, 9], [8, 17], [8, 26], [8, 34], [8, 41], [8, 46], [8, 53], [8, 62], [8, 70], [9, 1], [9, 7], [9, 14], [9, 21], [9, 27], [9, 32], [9, 37], [9, 41], [9, 48], [9, 55], [9, 62], [9, 69], [9, 73], [9, 80], [9, 87], [9, 94], [9, 100], [9, 107], [9, 112], [9, 118], [9, 123], [10, 1], [10, 7], [10, 15], [10, 21], [10, 26], [10, 34], [10, 43], [10, 54], [10, 62], [10, 71], [10, 79], [10, 89], [10, 98], [10, 107], [11, 6], [11, 13], [11, 20], [11, 29], [11, 38], [11, 46], [11, 54], [11, 63], [11, 72], [11, 82], [11, 89], [11, 98], [11, 109], [11, 118], [12, 5], [12, 15], [12, 23], [12, 31], [12, 38], [12, 44], [12, 53], [12, 64], [12, 70], [12, 79], [12, 87], [12, 96], [12, 104], [13, 1], [13, 6], [13, 14], [13, 19], [13, 29], [13, 35], [13, 43], [14, 6], [14, 11], [14, 19], [14, 25], [14, 34], [14, 43], [15, 1], [15, 16], [15, 32], [15, 52], [15, 71], [15, 91], [16, 7], [16, 15], [16, 27], [16, 35], [16, 43], [16, 55], [16, 65], [16, 73], [16, 80], [16, 88], [16, 94], [16, 103], [16, 111], [16, 119], [17, 1], [17, 8], [17, 18], [17, 28], [17, 39], [17, 50], [17, 59], [17, 67], [17, 76], [17, 87], [17, 97], [17, 105], [18, 5], [18, 16], [18, 21], [18, 28], [18, 35], [18, 46], [18, 54], [18, 62], [18, 75], [18, 84], [18, 98], [19, 1], [19, 12], [19, 26], [19, 39], [19, 52], [19, 65], [19, 77], [19, 96], [20, 13], [20, 38], [20, 52], [20, 65], [20, 77], [20, 88], [20, 99], [20, 114], [20, 126], [21, 1], [21, 11], [21, 25], [21, 36], [21, 45], [21, 58], [21, 73], [21, 82], [21, 91], [21, 102], [22, 1], [22, 6], [22, 16], [22, 24], [22, 31], [22, 39], [22, 47], [22, 56], [22, 65], [22, 73], [23, 1], [23, 18], [23, 28], [23, 43], [23, 60], [23, 75], [23, 90], [23, 105], [24, 1], [24, 11], [24, 21], [24, 28], [24, 32], [24, 37], [24, 44], [24, 54], [24, 59], [24, 62], [25, 3], [25, 12], [25, 21], [25, 33], [25, 44], [25, 56], [25, 68], [26, 1], [26, 20], [26, 40], [26, 61], [26, 84], [26, 112], [26, 137], [26, 160], [26, 184], [26, 207], [27, 1], [27, 14], [27, 23], [27, 36], [27, 45], [27, 56], [27, 64], [27, 77], [27, 89], [28, 6], [28, 14], [28, 22], [28, 29], [28, 36], [28, 44], [28, 51], [28, 60], [28, 71], [28, 78], [28, 85], [29, 7], [29, 15], [29, 24], [29, 31], [29, 39], [29, 46], [29, 53], [29, 64], [30, 6], [30, 16], [30, 25], [30, 33], [30, 42], [30, 51], [31, 1], [31, 12], [31, 20], [31, 29], [32, 1], [32, 12], [32, 21], [33, 1], [33, 7], [33, 16], [33, 23], [33, 31], [33, 36], [33, 44], [33, 51], [33, 55], [33, 63], [34, 1], [34, 8], [34, 15], [34, 23], [34, 32], [34, 40], [34, 49], [35, 4], [35, 12], [35, 19], [35, 31], [35, 39], [35, 45], [36, 13], [36, 28], [36, 41], [36, 55], [36, 71], [37, 1], [37, 25], [37, 52], [37, 77], [37, 103], [37, 127], [37, 154], [38, 1], [38, 17], [38, 27], [38, 43], [38, 62], [38, 84], [39, 6], [39, 11], [39, 22], [39, 32], [39, 41], [39, 48], [39, 57], [39, 68], [39, 75], [40, 8], [40, 17], [40, 26], [40, 34], [40, 41], [40, 50], [40, 59], [40, 67], [40, 78], [41, 1], [41, 12], [41, 21], [41, 30], [41, 39], [41, 47], [42, 1], [42, 11], [42, 16], [42, 23], [42, 32], [42, 45], [42, 52], [43, 11], [43, 23], [43, 34], [43, 48], [43, 61], [43, 74], [44, 1], [44, 19], [44, 40], [45, 1], [45, 14], [45, 23], [45, 33], [46, 6], [46, 15], [46, 21], [46, 29], [47, 1], [47, 12], [47, 20], [47, 30], [48, 1], [48, 10], [48, 16], [48, 24], [48, 29], [49, 5], [49, 12], [50, 1], [50, 16], [50, 36], [51, 7], [51, 31], [51, 52], [52, 15], [52, 32], [53, 1], [53, 27], [53, 45], [54, 7], [54, 28], [54, 50], [55, 17], [55, 41], [55, 68], [56, 17], [56, 51], [56, 77], [57, 4], [57, 12], [57, 19], [57, 25], [58, 1], [58, 7], [58, 12], [58, 22], [59, 4], [59, 10], [59, 17], [60, 1], [60, 6], [60, 12], [61, 6], [62, 1], [62, 9], [63, 5], [64, 1], [64, 10], [65, 1], [65, 6], [66, 1], [66, 8], [67, 1], [67, 13], [67, 27], [68, 16], [68, 43], [69, 9], [69, 35], [70, 11], [70, 40], [71, 11], [72, 1], [72, 14], [73, 1], [73, 20], [74, 18], [74, 48], [75, 20], [76, 6], [76, 26], [77, 20], [78, 1], [78, 31], [79, 16], [80, 1], [81, 1], [82, 1], [83, 7], [83, 35], [85, 1], [86, 1], [87, 16], [89, 1], [89, 24], [91, 1], [92, 15], [95, 1], [97, 1], [98, 8], [100, 10], [103, 1], [106, 1], [109, 1], [112, 1], [115, 1]];

//------------------ Sajda Data ---------------------

const Sajda = [
// [sura, aya, type]
[], [7, 206, "recommended"], [13, 15, "recommended"], [16, 50, "recommended"], [17, 109, "recommended"], [19, 58, "recommended"], [22, 18, "recommended"], [22, 77, "recommended"], [25, 60, "recommended"], [27, 26, "recommended"], [32, 15, "obligatory"], [38, 24, "recommended"], [41, 38, "obligatory"], [53, 62, "obligatory"], [84, 21, "recommended"], [96, 19, "obligatory"]];

/***/ }),

/***/ "./src/save.js":
/*!*********************!*\
  !*** ./src/save.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ save)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);


function save({
  attributes
}) {
  const {
    url,
    alignment
  } = attributes;
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    ..._wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps.save(),
    style: {
      textAlign: alignment
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: url
  }));
}

/***/ }),

/***/ "./src/edit.scss":
/*!***********************!*\
  !*** ./src/edit.scss ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/style.scss":
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

module.exports = window["React"];

/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ ((module) => {

module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ ((module) => {

module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/compose":
/*!*********************************!*\
  !*** external ["wp","compose"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["compose"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "./src/block.json":
/*!************************!*\
  !*** ./src/block.json ***!
  \************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"create-block/placequran","version":"0.1.0","title":"Place Quran","category":"media","icon":"book-alt","description":"Insert Quran verse with translation as image.","attributes":{"url":{"type":"string"},"surah":{"type":"integer","default":0},"verse":{"type":"string","default":""},"translation":{"type":"array","default":[]},"size":{"type":"string","default":"auto"},"alignment":{"type":"string","default":"left"}},"example":{"attributes":{"url":"https://placequran.com/1/1-7/ar,en"}},"supports":{"html":false},"textdomain":"placequran","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css"}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"index": 0,
/******/ 			"./style-index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = globalThis["webpackChunkplacequran"] = globalThis["webpackChunkplacequran"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["./style-index"], () => (__webpack_require__("./src/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map