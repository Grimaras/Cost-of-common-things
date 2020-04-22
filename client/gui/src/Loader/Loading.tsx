import React from 'react';
import './loader.css'

interface ILoadingProps {
    title: String,
    subTitle: String,
    loading?: boolean
};

export const Loading = (props: ILoadingProps) => {
    
    return (
        <section className="hero is-medium is-primary is-bold is-fullheight">
            <div className="hero-body">
                <div className="container">
                <h1 className="title">
                    {props.title}
                </h1>
                <h2 className="subtitle">
                    {props.subTitle}
                </h2>
                {
                    props.loading &&
                    <div className="lds-ripple"><div></div><div></div></div>
                }
                </div>
            </div>
        </section>
    )
}
