--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: postgis; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS postgis WITH SCHEMA public;


--
-- Name: EXTENSION postgis; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION postgis IS 'PostGIS geometry and geography spatial types and functions';


--
-- Name: report_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.report_status AS ENUM (
    'Active',
    'Resolved',
    'Critical'
);


ALTER TYPE public.report_status OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: admins; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.admins (
    admin_id integer NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.admins OWNER TO postgres;

--
-- Name: admins_admin_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.admins_admin_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.admins_admin_id_seq OWNER TO postgres;

--
-- Name: admins_admin_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.admins_admin_id_seq OWNED BY public.admins.admin_id;


--
-- Name: alerts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.alerts (
    id integer NOT NULL,
    message text NOT NULL,
    description text,
    date date NOT NULL,
    "time" time without time zone NOT NULL,
    status character varying(50) NOT NULL,
    importance character varying(50) NOT NULL,
    type character varying(50) NOT NULL,
    location text NOT NULL,
    affected_area text NOT NULL,
    created_by_admin_id integer,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.alerts OWNER TO postgres;

--
-- Name: alerts_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.alerts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.alerts_id_seq OWNER TO postgres;

--
-- Name: alerts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.alerts_id_seq OWNED BY public.alerts.id;


--
-- Name: categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categories (
    id integer NOT NULL,
    report_id integer,
    throttled boolean,
    burnt boolean,
    fractions integer,
    missing integer,
    trapped boolean,
    submerged_dwelling boolean,
    electrification boolean,
    explosion boolean
);


ALTER TABLE public.categories OWNER TO postgres;

--
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.categories_id_seq OWNER TO postgres;

--
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;


--
-- Name: feedbacks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.feedbacks (
    id integer NOT NULL,
    name character varying(100),
    email character varying(255),
    message text NOT NULL,
    user_id integer,
    submitted_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.feedbacks OWNER TO postgres;

--
-- Name: feedbacks_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.feedbacks_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.feedbacks_id_seq OWNER TO postgres;

--
-- Name: feedbacks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.feedbacks_id_seq OWNED BY public.feedbacks.id;


--
-- Name: report_details; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.report_details (
    id integer NOT NULL,
    report_id integer NOT NULL,
    spread_rate numeric(5,2),
    road_status character varying(100),
    injured_number integer,
    bleeding_number integer,
    threatened_structures integer,
    containment_percent numeric(5,2),
    burnt_area numeric(10,2),
    institution_type character varying(100),
    evacuated boolean,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    is_deleted boolean DEFAULT false
);


ALTER TABLE public.report_details OWNER TO postgres;

--
-- Name: report_details_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.report_details_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.report_details_id_seq OWNER TO postgres;

--
-- Name: report_details_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.report_details_id_seq OWNED BY public.report_details.id;


--
-- Name: reports; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reports (
    id integer NOT NULL,
    location public.geography(Point,4326) NOT NULL,
    altitude numeric(10,2),
    amplitude numeric(10,2),
    title character varying(255) NOT NULL,
    description text,
    crisis_type character varying(50) NOT NULL,
    image_url text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    is_deleted boolean DEFAULT false,
    user_id integer,
    status public.report_status DEFAULT 'Active'::public.report_status NOT NULL
);


ALTER TABLE public.reports OWNER TO postgres;

--
-- Name: reports_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.reports_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.reports_id_seq OWNER TO postgres;

--
-- Name: reports_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.reports_id_seq OWNED BY public.reports.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    username character varying(50) NOT NULL,
    email character varying(255) NOT NULL,
    phone_number character varying(20) NOT NULL,
    password character varying(255) NOT NULL,
    is_organization_member boolean DEFAULT false,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    created_by_admin_id integer,
    community character varying(50) NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_user_id_seq OWNER TO postgres;

--
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- Name: admins admin_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins ALTER COLUMN admin_id SET DEFAULT nextval('public.admins_admin_id_seq'::regclass);


--
-- Name: alerts id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.alerts ALTER COLUMN id SET DEFAULT nextval('public.alerts_id_seq'::regclass);


--
-- Name: categories id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);


--
-- Name: feedbacks id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.feedbacks ALTER COLUMN id SET DEFAULT nextval('public.feedbacks_id_seq'::regclass);


--
-- Name: report_details id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.report_details ALTER COLUMN id SET DEFAULT nextval('public.report_details_id_seq'::regclass);


--
-- Name: reports id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reports ALTER COLUMN id SET DEFAULT nextval('public.reports_id_seq'::regclass);


--
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- Data for Name: admins; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.admins (admin_id, email, password, created_at) VALUES (1, 'test02@example.com', '$2b$10$6EjUzB4jxzUbHuL0rtRjZudqHtrxWasaTAiiOTN4j916KJhQx1JGa', '2025-04-10 21:07:31.954511');


--
-- Data for Name: alerts; Type: TABLE DATA; Schema: public; Owner: postgres
--




--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: postgres
--




--
-- Data for Name: feedbacks; Type: TABLE DATA; Schema: public; Owner: postgres
--




--
-- Data for Name: report_details; Type: TABLE DATA; Schema: public; Owner: postgres
--




--
-- Data for Name: reports; Type: TABLE DATA; Schema: public; Owner: postgres
--




--
-- Data for Name: spatial_ref_sys; Type: TABLE DATA; Schema: public; Owner: postgres
--




--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.users (user_id, username, email, phone_number, password, is_organization_member, created_at, updated_at, created_by_admin_id, community) VALUES 
(1, 'yessine', 'yessine02@gmail.com', '0655555555', '$2b$10$x4Z5lwCN/KzhdYEFZzZSJeSxS5L5/ZWMRIDIadR5MP73fctVwKt8y', NULL, '2025-03-26 12:40:19.529744', '2025-03-26 12:40:19.529744', NULL, 'unknown'),
(2, 'mustafaxv7', 'mustafanadour@gmail.com', '0655555550', '$2b$10$TLLbMC9xvbcUGDU.ZcPNjO6TJavkHcLsGS/ie90yUX7kPiqtysX9y', NULL, '2025-03-26 12:58:09.35488', '2025-03-26 12:58:09.35488', NULL, 'unknown'),
(3, 'halim', '4ndjo694l@mozmail.com', '0541197999', '$2b$10$YY8ZRFgZmKTwZ7aschKVXuCQX1fmypZVNqS9M2r6BdiVzz3BINSCy', NULL, '2025-03-27 19:05:27.992726', '2025-03-27 19:05:27.992726', NULL, 'unknown'),
(10, 'mounir', 'mounir02@gmail.com', '0088990088', '$2b$10$wYs4Q0WfjGhKrhhN11jcouw42e9L52fLS9EMXU2bEJf5c5RWqD8Gu', NULL, '2025-03-27 22:27:16.587756', '2025-03-27 22:27:16.587756', NULL, 'unknown'),
(11, 'moustafa', 'moustafa44@gmail.com', '9999999999', '$2b$10$Tq4rfd0uFaZetmRm43UGoOJ15jv8wVLBMltGbMO4CIuiZsscymzk.', NULL, '2025-03-29 14:48:41.271522', '2025-03-29 14:48:41.271522', NULL, 'unknown'),
(12, 'hesbellaoui mehdi', 'hasbellaouimehdi@gmail.com', '0657901898', '$2b$10$9A/mDpGBr5JjZspNJIzwHOHyikTiz/GmHhFrBJv224np7QgEvO4LG', NULL, '2025-03-29 17:21:36.100664', '2025-03-29 17:21:36.100664', NULL, 'unknown'),
(14, 'Mohammed Benali', 'm_benali@esi.dz', '0000000000', '$2b$10$PTQc29MHA55FfRqX2If.WewxdKaT4BUgZNFN.Yq5m/24wM50G5Y5i', NULL, '2025-05-01 16:26:29.250732', '2025-05-01 16:26:29.250732', NULL, 'Ouled Fares');


--
-- Name: admins_admin_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.admins_admin_id_seq', 1, true);


--
-- Name: alerts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.alerts_id_seq', 1, false);


--
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.categories_id_seq', 1, false);


--
-- Name: feedbacks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.feedbacks_id_seq', 1, false);


--
-- Name: report_details_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.report_details_id_seq', 1, false);


--
-- Name: reports_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reports_id_seq', 1, false);


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_user_id_seq', 14, true);


--
-- Name: admins admins_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key UNIQUE (email);


--
-- Name: admins admins_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_pkey PRIMARY KEY (admin_id);


--
-- Name: alerts alerts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.alerts
    ADD CONSTRAINT alerts_pkey PRIMARY KEY (id);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- Name: feedbacks feedbacks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.feedbacks
    ADD CONSTRAINT feedbacks_pkey PRIMARY KEY (id);


--
-- Name: report_details report_details_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.report_details
    ADD CONSTRAINT report_details_pkey PRIMARY KEY (id);


--
-- Name: reports reports_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reports
    ADD CONSTRAINT reports_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_phone_number_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_phone_number_key UNIQUE (phone_number);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: alerts alerts_created_by_admin_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.alerts
    ADD CONSTRAINT alerts_created_by_admin_id_fkey FOREIGN KEY (created_by_admin_id) REFERENCES public.admins(admin_id);


--
-- Name: feedbacks feedbacks_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.feedbacks
    ADD CONSTRAINT feedbacks_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- Name: categories fk_report; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT fk_report FOREIGN KEY (report_id) REFERENCES public.reports(id) ON DELETE CASCADE;


--
-- Name: report_details fk_report_details_report; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.report_details
    ADD CONSTRAINT fk_report_details_report FOREIGN KEY (report_id) REFERENCES public.reports(id) ON DELETE CASCADE;


--
-- Name: reports fk_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reports
    ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE SET NULL;


--
-- Name: users users_created_by_admin_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_created_by_admin_id_fkey FOREIGN KEY (created_by_admin_id) REFERENCES public.admins(admin_id) ON DELETE SET NULL;


--
-- PostgreSQL database dump complete
--

