-- Database generated with pgModeler (PostgreSQL Database Modeler).
-- pgModeler version: 1.0.4
-- PostgreSQL version: 15.0
-- Project Site: pgmodeler.io
-- Model Author: ---

-- Database creation must be performed outside a multi lined SQL file. 
-- These commands were put in this file only as a convenience.
-- 
-- object: new_database | type: DATABASE --
-- DROP DATABASE IF EXISTS new_database;
CREATE DATABASE new_database;
-- ddl-end --


-- object: administracion | type: SCHEMA --
-- DROP SCHEMA IF EXISTS administracion CASCADE;
CREATE SCHEMA administracion;
-- ddl-end --
ALTER SCHEMA administracion OWNER TO postgres;
-- ddl-end --

SET search_path TO pg_catalog,public,administracion;
-- ddl-end --

-- object: administracion.usuario | type: TABLE --
-- DROP TABLE IF EXISTS administracion.usuario CASCADE;
CREATE TABLE administracion.usuario (
	id smallint NOT NULL,
	nombres varchar,
	apellidos varchar,
	username varchar,
	password varchar,
	correo varchar,
	estado smallint,
	rol_id smallint,
	CONSTRAINT usuario_pk PRIMARY KEY (id)
);
-- ddl-end --
COMMENT ON COLUMN administracion.usuario.id IS E'identificador de usuario de base de datos';
-- ddl-end --
COMMENT ON COLUMN administracion.usuario.estado IS E'0(inactivo), 1(activo)';
-- ddl-end --
ALTER TABLE administracion.usuario OWNER TO postgres;
-- ddl-end --

-- object: administracion.rol | type: TABLE --
-- DROP TABLE IF EXISTS administracion.rol CASCADE;
CREATE TABLE administracion.rol (
	id smallint NOT NULL,
	nombre varchar,
	descripcion varchar,
	estado smallint,
	CONSTRAINT rol_pk PRIMARY KEY (id)
);
-- ddl-end --
ALTER TABLE administracion.rol OWNER TO postgres;
-- ddl-end --

-- object: administracion."Empresa" | type: TABLE --
-- DROP TABLE IF EXISTS administracion."Empresa" CASCADE;
CREATE TABLE administracion."Empresa" (
	id smallint,
	nombre smallint,
	codigo_registro smallint,
	razon_social smallint,
	nit smallint,
	usuario_id smallint,
	logo varchar

);
-- ddl-end --
ALTER TABLE administracion."Empresa" OWNER TO postgres;
-- ddl-end --

-- object: administracion.horario | type: TABLE --
-- DROP TABLE IF EXISTS administracion.horario CASCADE;
CREATE TABLE administracion.horario (
	id smallint,
	fecha timestamp,
	hora_inicio time,
	hora_fin smallint,
	estado smallint,
	empresa_id smallint

);
-- ddl-end --
ALTER TABLE administracion.horario OWNER TO postgres;
-- ddl-end --

-- object: administracion.reservacion | type: TABLE --
-- DROP TABLE IF EXISTS administracion.reservacion CASCADE;
CREATE TABLE administracion.reservacion (
	id smallint,
	usuario_id smallint,
	horario_id smallint,
	comentario varchar

);
-- ddl-end --
ALTER TABLE administracion.reservacion OWNER TO postgres;
-- ddl-end --

-- object: rol__id_fk | type: CONSTRAINT --
-- ALTER TABLE administracion.usuario DROP CONSTRAINT IF EXISTS rol__id_fk CASCADE;
ALTER TABLE administracion.usuario ADD CONSTRAINT rol__id_fk FOREIGN KEY (rol_id)
REFERENCES administracion.rol (id) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: usuario_id_fk | type: CONSTRAINT --
-- ALTER TABLE administracion."Empresa" DROP CONSTRAINT IF EXISTS usuario_id_fk CASCADE;
ALTER TABLE administracion."Empresa" ADD CONSTRAINT usuario_id_fk FOREIGN KEY (usuario_id)
REFERENCES administracion.usuario (id) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: empresa_id_fk | type: CONSTRAINT --
-- ALTER TABLE administracion.horario DROP CONSTRAINT IF EXISTS empresa_id_fk CASCADE;
ALTER TABLE administracion.horario ADD CONSTRAINT empresa_id_fk FOREIGN KEY (empresa_id)
REFERENCES administracion."Empresa" (id) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: horario_id_fk | type: CONSTRAINT --
-- ALTER TABLE administracion.reservacion DROP CONSTRAINT IF EXISTS horario_id_fk CASCADE;
ALTER TABLE administracion.reservacion ADD CONSTRAINT horario_id_fk FOREIGN KEY (horario_id)
REFERENCES administracion.horario (id) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: usuario_id_fk | type: CONSTRAINT --
-- ALTER TABLE administracion.reservacion DROP CONSTRAINT IF EXISTS usuario_id_fk CASCADE;
ALTER TABLE administracion.reservacion ADD CONSTRAINT usuario_id_fk FOREIGN KEY (usuario_id)
REFERENCES administracion.usuario (id) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --


