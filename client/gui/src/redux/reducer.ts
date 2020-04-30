import { createAction, AnyAction, createReducer } from "@reduxjs/toolkit";
import { store } from "./store";
import _ from "lodash";
import {IComposant} from "../Game/models";
import {ScenariosObjectifs} from "../Game/Objective";
import {etapes} from "../Game/Etapes";

export const companionSendPong = createAction("COMPANION_SEND_PONG");
export const companionLoadDone = createAction<any[]>("COMPANION_LOAD_DONE");


export const goToObjective = createAction("GOTO_OBJECTIVE");
export const startGame  = createAction("START_GAME");
export const stopGame  = createAction("STOP_GAME");
export const setGameId = createAction<string>("SET_GAME_ID");
export const setStep = createAction<number>("SET_GAME_STEP");
export const setFocusedComponent = createAction<string>("SET_GAME_FOCUSED_COMPONENT");

export const chooseComponent = createAction<IComposant>("ADD_COMPONENT_AT_STEP");
export const gameTick = createAction("GAME_TICK");
export const receptResult = createAction<any>("RECEPT_RESULT");

export interface IAppState {
    companionState: {
        isAlive: boolean;
        isReady: boolean;
    },
    objectiveNb?: number;
    game?: {
        id?: string;
        currentStep: number;
        components: IComposant[];
        focusedComponent?: string;
        scenarioId: number;
        rAndD: number;
        cost: number;
        score?: number;
        eco?: number;
        perf?: number;
        history: {
            rAndD: number[];
            cost: number[];
            perf: number[];
        }
    },
    cache: {
        components?: any[],
        steps?: number[],
        maxCriteraValues: any,
    },
    gameResult?: any
}

const initialState: IAppState = {
    companionState: {
        isAlive: false,
        isReady: false
    },
    cache: {
        components: [],
        steps: [],
        maxCriteraValues: []
    }
};

// Here it is my reducer, his tasks is to merge the future state with
export const counterReducer = createReducer(initialState, {
    [companionSendPong.type]: (state: IAppState) => ({ ...state,
        companionState: { ...state.companionState,
            isAlive: true
        }
    }),
    [companionLoadDone.type]: (state: IAppState, action) => {
        const data = action.payload;
        const allSteps: any[] =  _.uniq(_.map(data, (composant: any) => composant.idEtape));
        const allCriteras = _.map(_.groupBy( data, (composant: any) => composant.idEtape), (c) => _.map(c, (c) => c.criteres));
        console.log("All fetched criteras", allCriteras);
        const maxValues = _.map(allCriteras, (criteraPerStep, step) => _.reduce(_.keys(criteraPerStep[0]), (obj, k: any) => {
            console.log(step, obj);
            const allValues = _.map(allCriteras, (criteraPerStep) => _.map(criteraPerStep, (c) => c[k]));
            console.log("All values", allValues);
            return {
                ...obj,
                [k]: typeof allValues[step][0] === "number"
                    ? Math.max(...(allValues[step] as number[]))
                    : 0

            }
        }, {}));

        console.log("All max values : ", maxValues);


        return { ...state,
            companionState: { ...state.companionState,
                isReady: true
            },
            cache: { ...state.cache,
                components: action.payload,
                steps: allSteps,
                maxCriteraValues: maxValues
            },
        }
    },
    [goToObjective.type]: (state: IAppState) => ({...state,
        objectiveNb: Math.floor(Math.random() * ScenariosObjectifs.length)
    }),
    [startGame.type]: (state: IAppState) => ({...state,
        game: {
            currentStep: etapes[0].id,
            scenarioId: state.objectiveNb!,
            components: [],
            rAndD: 0,
            cost: 0,
            history: {
                rAndD: [],
                cost: [0],
                perf: [0],
            }
        }
    }),
    [setStep.type]: (state: IAppState, action) => ({...state,
        game: {...state.game!,
            currentStep: action.payload,
            focusedComponent: undefined
        }
    }),
    [setFocusedComponent.type]: (state: IAppState, action) => ({...state,
        game: {...state.game!,
            focusedComponent: action.payload
        }
    }),
    [chooseComponent.type]: (state: IAppState, action) => ({...state,
        game: {...state.game!,
            currentStep: etapes[etapes.findIndex((e) => e.id === state.game!.currentStep) + 1].id,
            focusedComponent: undefined,
            components: [
                ..._.filter(state.game!.components, (c) => c.idEtape !== action.payload.idEtape && !action.payload.bans.includes(c.idComponent)),
                    action.payload
            ],
        }
    }),
    [gameTick.type]: (state) => ({...state,
        game: {...state.game!,
            rAndD: state.game!.rAndD + 100,
            history: {...state.game!.history,
                // Donnee recurente, filtrer uniquement les 25 dernieres informations
                rAndD: _.takeRight([...state.game!.history.rAndD, state.game!.rAndD], 25),
                cost: _.sortedUniq([
                    ...state.game!.history.cost,
                    _.reduce(state.game!.components, (acc, e) => e.criteres.prix + acc, 0)
                ]),
                perf: _.sortedUniq([
                    ...state.game!.history.perf,
                    _.reduce(state.game!.components, (acc, e) => e.criteres.perf + acc, 0)
                ])
            }
        }
    }),
    [receptResult.type]: (state, action ) => ({...state,
        gameResult: action.payload
    }),
    [stopGame.type]: (state, action) => {
        const sommeAll = _.reduce(state.game!.components, (acc, element) => {
            return {
                eco: acc.eco + element.criteres.eco,
                perf: acc.perf + element.criteres.perf,
                prix: acc.prix + element.criteres.prix
            }
        }, {
            eco: 0,
            perf: 0,
            prix: 0
        });

        console.log("Somme all = ", sommeAll);

        const scenario = ScenariosObjectifs[state.game!.scenarioId];

        var resTarget = scenario.criteres.prix + scenario.criteres.perf;
        var resProcent = Math.round(((sommeAll.perf + sommeAll.prix)*100)/resTarget);
        const resShow = resProcent > 100 ? resProcent - ((resProcent - 100)*2) :  resProcent;

        return {...state,
            game: {...state.game!,
                score: resShow,
                cost: sommeAll.prix,
                eco: sommeAll.eco,
                perf: sommeAll.perf
            }
        }
    },
    [setGameId.type]: (state, action) => ({...state,
        game: {...state.game!,
            id: action.payload
        }
    })
});

(window as any).CompanionPong = () => store.dispatch(companionSendPong());
