export const getProgressBarCurrentStep = (max, parts, sceneSteps) => (
    max / parts / sceneSteps
);

export const getSceneProgressMaxValue = (max, parts, startValue) => {
    const calculatedMax = startValue + max / parts;

    return calculatedMax > max ? max : calculatedMax;
};
