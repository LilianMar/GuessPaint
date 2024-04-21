
CREATE TABLE public.words (
	id uuid NOT NULL,
	texto varchar(255) NOT NULL,
	CONSTRAINT word_pkey PRIMARY KEY (id)
);

CREATE TABLE public.categories (
	id uuid NOT NULL,
	title varchar(255) NOT NULL,
	CONSTRAINT category_pkey PRIMARY KEY (id)
);

CREATE TABLE public.words_category (
	id uuid NOT NULL,
	word_id uuid NOT NULL,
	category_id uuid NOT NULL,
	CONSTRAINT word_category_pkey PRIMARY KEY (id),
	CONSTRAINT word_category_word_id_fkey FOREIGN KEY (word_id) REFERENCES public.words(id),
	CONSTRAINT word_category_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id)
);

CREATE TABLE public.rooms (
	id uuid NOT NULL,
	title varchar(255) NOT NULL,
	category_id uuid NOT NULL,
	progress varchar(255) NOT NULL,
	CONSTRAINT room_pkey PRIMARY KEY (id),
	CONSTRAINT word_category_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id)
);

