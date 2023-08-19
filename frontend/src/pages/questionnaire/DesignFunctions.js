// Function to update the panel height state
export const updatePanelHeight = (setPanelHeight) => {
  const panelElement = document.querySelector(".panel");
  if (panelElement) {
    setPanelHeight(panelElement.offsetHeight);
  }
};

// Function to update the  markingScheme height state
export const updateMarkingSchemeHeight = (setMarkingSchemeHeight) => {
  const markingSchemeElement = document.querySelector(".marking-scheme");
  if (markingSchemeElement) {
    setMarkingSchemeHeight(markingSchemeElement.offsetHeight);
  }
};

// Function to update the text height state
export const updateTextHeight = (setTextHeight) => {
  const textElement = document.querySelector(".text1");
  if (textElement) {
    setTextHeight(textElement.offsetHeight);
  }
};
