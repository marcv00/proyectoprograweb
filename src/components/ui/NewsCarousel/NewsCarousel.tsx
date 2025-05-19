import { useEffect, useState } from "react";
import styles from "./NewsCarousel.module.css";
import { useNavigate } from "react-router-dom";

type News = {
    id: number;
    title: string;
    shortsummary: string;
    text: string;
    readingtime: string; // "4 minutos"
    banner: string; // URL de imagen
};

type Props = {
    news: News[];
};

function slugify(title: string) {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, "")
        .replace(/\s+/g, "-");
}

export default function NewsCarousel({ news }: Props) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [progress, setProgress] = useState(0);

    const navigate = useNavigate();

    const maxVisible = 5; // 1 grande + 4 chicos
    const totalNews = news.length;

    useEffect(() => {
        setProgress(0);

        const duration = 10; // segundos
        const interval = setInterval(() => {
            setProgress((prev) => {
                const nextProgress = prev + 100 / (duration * 10);
                if (nextProgress >= 100) {
                    handleSideItemClick(0); // 👈 simulate click on first side item
                    return 0;
                }
                return nextProgress;
            });
        }, 100);

        return () => clearInterval(interval);
    }, [currentIndex, totalNews]);

    const handleClick = (index: number) => {
        const item = news[index];
        if (item) {
            const url = `/news/${slugify(item.title)}`;
            navigate(url);
        }
    };

    const visibleNews = Array.from(
        { length: maxVisible },
        (_, i) => news[(currentIndex + i) % totalNews]
    );

    const handleSideItemClick = (sideIndex: number) => {
        // Calculate the actual index of the clicked side item in the original news array
        const newIndex = (currentIndex + sideIndex + 1) % totalNews;
        setCurrentIndex(newIndex);
        setProgress(0);
    };

    return (
        <div className={styles.container}>
            <div
                className={styles.mainNews}
                style={{ backgroundImage: `url(${visibleNews[0].banner})` }}
                onClick={() => handleClick(currentIndex)}
            >
                <div className={styles.overlay}>
                    <h2>{visibleNews[0].title}</h2>
                    <p>{visibleNews[0].shortsummary}</p>
                    <div className={styles.progressBar}>
                        <div
                            className={styles.progress}
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </div>
            </div>

            <div className={styles.sideNews}>
                {visibleNews.slice(1).map((n, i) => (
                    <div
                        key={n.id}
                        className={styles.sideItem}
                        style={{ backgroundImage: `url(${n.banner})` }}
                        onClick={() => handleSideItemClick(i)}
                    />
                ))}
            </div>
        </div>
    );
}
