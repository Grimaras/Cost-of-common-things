
export interface IComposantEtapeFabrication {
    _id: string,
    idEtape: number,
    localisation: {
        name: string;
        codePays: string;
        description: string;
        gps: {
            x: number;
            y: number;
        }
    }
}

export interface IComposantCriteres {
    prix: number;
    eco: number;
    perf: number;
    design: number;
}

export interface IComposant {
    _id: string;
    idComponent: string;
    idProject: number;
    idEtape: number;
    name: string;
    description: string;
    image: string;
    bans: string[];
    criteres: IComposantCriteres;
    etapesFabrication: IComposantEtapeFabrication[];
}
