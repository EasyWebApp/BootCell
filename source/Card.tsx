import { createCell } from 'web-cell';

interface CardLink {
    path: string;
    text?: string;
    level?: string;
}
interface CardData {
    className?: string;
    title: string;
    link: CardLink;
    image?: any;
    children?: any;
}

export function Card({
    className = '',
    title,
    link,
    image,
    children
}: CardData) {
    return (
        <div className={`card ${className}`}>
            {typeof image !== 'string' ? (
                image
            ) : (
                <img className="card-img-top" src={image} />
            )}
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{children}</p>
                <a
                    className={`btn btn-${link.level || 'primary'}`}
                    href={link.path}
                    title={title}
                >
                    {link.text || 'Enter'}
                </a>
            </div>
        </div>
    );
}
