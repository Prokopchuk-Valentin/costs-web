import { createStore, createEvent } from "effector";
import { debug } from "patronum";

export const buttonClickedPlus = createEvent();
export const buttonClickedMinus = createEvent();
export const buttonClickedMultiply = createEvent();
export const buttonClickedDeleted = createEvent();
export const changeMultiplierOrDivisor = createEvent<number>();

export const $counter = createStore(0);
export const $multiplierOrDivisor = createStore(0);

$counter.on(buttonClickedPlus, (counter) => counter + 1);
$counter.on(buttonClickedMinus, (counter) => counter - 1);
$counter.on(buttonClickedMultiply, (counter) => counter / 2);
$counter.on(buttonClickedDeleted, (counter) => counter / 3);

$multiplierOrDivisor.on(changeMultiplierOrDivisor, (_, res) => res);

debug($counter);
