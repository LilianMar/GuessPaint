CREATE TABLE public.words (
    word_id SERIAL PRIMARY KEY,
    texto VARCHAR(255) NOT NULL
);

CREATE TABLE public.categories (
    category_id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL
);

CREATE TABLE public.words_category (
    wordCategory_id INT NOT NULL PRIMARY KEY UNIQUE,
    word_id INT NOT NULL,
    category_id INT NOT NULL,
    FOREIGN KEY (word_id) REFERENCES words (word_id),
    FOREIGN KEY (category_id) REFERENCES categories (category_id)

);

CREATE TABLE rooms (
    room_id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    category_id INT NOT NULL,
    progress VARCHAR(20) NOT NULL,
    FOREIGN KEY (category_id) REFERENCES categories (category_id)
);