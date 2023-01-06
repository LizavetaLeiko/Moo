export interface IActor {
    id: number,
    photo?: string,
    name: string,
    enName?: string,
    profession: string,
    enProfession?: string,
    _id: string
}

export interface IActorFullInfo {
    spouses?: Array<
        {
            _id?: string,
            id?: number,
            name?: string,
            divorced?: boolean,
            divorcedReason?: string,
            sex?: string,
            children?: number,
            relation?: string
        }
    >,
    __v?: number,
    age?: number,
    birthPlace?: Array<{
        value?: string
    }>,
    birthday?: string,
    countAwards?: number,
    createdAt?: string,
    death?: any,
    deathPlace?: Array<{
        value?: string
    }>,
    facts?: Array<
        {
            value?: string
        }
    >
    growth?: number,
    movies?: Array<
        {
            id?: number,
            name?: string,
            rating?: number,
            general?: boolean,
            description?: string
        }
    >,
    id?: number,
    name?: string,
    enName?: string,
    photo?: string,
    profession?: Array<
        {
            value?: string
        }
    >,
    sex?: string,
    updatedAt?: string
}

