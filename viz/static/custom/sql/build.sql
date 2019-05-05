CREATE TABLE controle.viz_tre_tipo_recurso (
	viz_tre_cod_tipo_recurso int,
	viz_tre_dsc_tipo_recurso varchar(30),
	viz_tre_dsc_icone_recurso varchar(30)
);

CREATE TABLE controle.viz_rec_recurso (
	viz_rec_cod_recurso  int,
	viz_tre_cod_tipo_recurso int,
	viz_rec_dsc_nome_recurso varchar(50),
	viz_rec_dsc_recurso varchar(250),
	viz_rec_dsc_status_recurso varchar(50),
	viz_rec_dsc_path varchar(250),
	viz_rec_cod_modulo int,
	viz_rec_cod_cubo int,
	viz_rec_dsc_role varchar(250)
);

CREATE TABLE controle.viz_avi_aviso (
	viz_avi_cod_aviso int,
	viz_avi_dsc_titulo_aviso varchar(30),
	viz_avi_dsc_texto_aviso varchar(250),	
	viz_avi_dsc_status_aviso varchar(30),
	viz_avi_dsc_role varchar(250),
	viz_avi_dat_registro timestamp,
	viz_avi_dat_limite timestamp,
	viz_avi_dsc_tipo_aviso varchar(20)
);

CREATE TABLE controle.sar_aprova_reprocesso (
	sar_usuario_id text NULL,
	sar_modulo_id int4 NULL,
	sar_cubo_id int4 NULL,
	sar_observacao text NULL,
	sar_competencia int4 NULL,
	sar_data_aprovacao timestamp NULL,
	sar_status_aprovacao text NULL,
	id int4 NULL,
	id_solicitacao int4 NULL
);

CREATE TABLE controle.slr_solicitacao_reprocesso (
	slr_usuario_id text NULL,
	slr_modulo_id int4 NULL,
	slr_cubo_id int4 NULL,
	slr_solicitacao text NULL,
	slr_competencia int4 NULL,
	slr_data_solicitacao timestamp NULL,
	id int4 NULL,
	slr_status varchar(20) NULL
);

CREATE TABLE controle.prl_processos_log (
	prl_cod_processo_log int4 NULL,
	prl_txt_mensagem_resumida varchar(600) NULL,
	prl_txt_mensagem_html text NULL,
	prl_txt_mensagem_telegram varchar(600) NULL,
	prl_cod_telegram_id int8 NULL,
	prl_txt_destinatario varchar(600) NULL,
	prl_dsc_tipo varchar(50) NULL,
	prl_dat_registro timestamp NULL
)