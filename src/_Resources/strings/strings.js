import Constants from "../../_commons/Constants";
import Permissions from "../../_commons/Permissions";
import DocumentStatusIds from "../../_commons/DocumentStatusIds";

const documents = "Documentos";
const users = "Usuarios";
const user_profile = "Mi perfil";
const emailText="Correo electrónico";

const permissionsStrings = {};
permissionsStrings[Permissions.ID_ALL_PERMISSIONS] = "Todos los permisos";
permissionsStrings[Permissions.ID_SEE_USERS] = "Ver usuarios";
permissionsStrings[Permissions.ID_CREATE_USERS] = "Crear usuarios";
permissionsStrings[Permissions.ID_UPDATE_USERS] = "Editar usuarios";
permissionsStrings[Permissions.ID_DISABLE_USERS] = "Desactivar usuarios";
permissionsStrings[Permissions.ID_SEE_DOCUMENTS_PERMISSION] = "Ver documentos";

const currencyStrings = {};
currencyStrings[Constants.ID_BOLIVAR_CURRENCY] = "VEB";
currencyStrings[Constants.ID_DOLLAR_CURRENCY] = "USD";

const docStatusTexts = {};
docStatusTexts[DocumentStatusIds.INCOMING] = "Por procesar";
docStatusTexts[DocumentStatusIds.ON_IMPORT_PENDING] = "Por importar en XRT";
docStatusTexts[DocumentStatusIds.ON_CONCILIATION_COMPLETE] = "Conciliado en XRT";
docStatusTexts[DocumentStatusIds.ON_PUBLISH] = "Transmitido a SotfLand";

const Strings = Object.freeze({
    text_status_by_id:docStatusTexts,
    text_currencies_by_id:currencyStrings,
    text_yes:"Sí",
    text_no:"No",
    text_hide:"Ocultar",
    text_show:"Mostrar",
    text_email:emailText,
    text_name:"Nombre",
    text_last_name:"Apellido",
    text_save:"Guardar",
    text_send:"Enviar",
    text_cancel:"Cancelar",
    text_search:"Buscar",
    text_status:"Estatus",
    text_permissions:"Permisos",
    text_all:"Todos",
    text_activate_singular:"Activo",
    text_inactivate_singular:"Inactivo",
    text_activate_plural:"Activos",
    text_inactivate_plural:"Inactivos",
    text_not_data:"No se encontraron registros para mostrar",
    text_operation_successful:"Operación completada exitosamente",
    text_date_title:"Fecha:",
    text_companies:"Compañias",
    text_electronic_document:"Recibo", 
    text_cash_document:"Anexo", 
    text_created_date:"Fecha de creación",
    loading:"Cargando...",
    login_title:"Monitor de conciliaciones",
    login_subtitle:"Inicio de sesión",
    login_user_name_label:emailText,
    login_user_password_label:"Contraseña",
    login_button:"Ingresar",
    login_fotgot_pass_button:"Olvide mi contraseña",
    forgot_pass_view_title:"Solicitar cambio de contraseña",
    forgot_pass_view_successful_message:"Su solicitud ha sido envida satisfactoriamente. Por favor, revise su correo electrónico.",
    side_bar_documents:documents,
    side_bar_users:users,
    side_bar_user_profile:user_profile,
    side_bar_logout:"Cerrar sesión",
    document_type_cash: "Deposito",
    documents_list_title: documents,
    documents_list_column_id:"id",
    documents_list_column_doc_type:"Tipo",
    documents_list_column_doc_number:"Nro. Documento",
    documents_list_column_date_conciliated:"Fecha Conciliación",
    documents_list_column_status:"Estatus",
    documents_list_column_zone:"Ruta",
    documents_list_column_created_by_code:"Código de Vendedor",
    documents_list_column_created_by_name:"Vendedor",
    documents_list_column_document_date:"Fecha Documento",
    documents_list_column_document_ref:"Referencia",
    documents_list_column_document_amount:"Monto",
    documents_list_column_document_edit_amount:"Monto editado",
    documents_list_column_document_bank_name:"Banco",
    documents_list_column_document_bank_account_number:"Nro. Cuenta",
    documents_list_column_document_client_code:"Cód. Cliente",
    documents_list_status_conciliated:"Conciliado",
    documents_list_status_no_conciliated:"No Conciliado",
    documents_details_doc_id_title:"ID:",
    documents_details_created_by_title:"Creador por:",
    documents_details_zone_title:"Ruta:",
    documents_details_conciliated_title:"Conciliado:",
    documents_details_vendor_title:"Vendedor:",
    documents_details_document_date_title:"Fecha Documento:",
    documents_details_bank_name_title:"Banco:",
    documents_details_bank_account_number_title:"Cuenta:",
    documents_details_payment_type_title:"Forma de pago:",
    documents_details_document_reference_title:"Referencia:",
    documents_details_document_attachments_title:"Documentos Asociados",
    documents_details_client_not_found_title:"Cliente no encontrado",
    documents_details_one_client_title:"Cliente",
    documents_details_one_client_dni_title:"RIF:",
    documents_details_one_client_code_title:"Código:",
    documents_details_many_clients_title:"Clientes",
    documents_details_many_clients_dni_title:"RIF",
    documents_details_many_clients_code_title:"Código",
    documents_details_amount_title:"Monto:",
    documents_details_edit_amount_title:"Monto editado:",
    documents_details_overpayment_title:"Sobrepago:",
    documents_details_attachments_not_found_title:"Documentos no encontrados",
    documents_details_attachments_unknown_type_title:"Documentos desconocidos",
    documents_details_attachment_id_title:"Documento",
    documents_details_attachment_amount_title:"Monto",
    user_profile_container_title:user_profile,
    user_profile_title:"Mi información",
    change_pass_title:"Cambiar mi contraseña",
    change_pass_current_pass:"Contraseña Actual",
    change_pass_new_pass:"Nueva Contraseña",
    change_pass_confirm_pass:"Confirmar Contraseña",
    change_pass_external_title:"Restaurar Contraseña",
    change_pass_external_successful:"Contraseña establecida exitosamente",
    user_list_title:users,
    user_list_button_new:"Nuevo Usuario",
    new_user_title:"Nuevo Usuario",
    user_details_permissions_by_company_title:"Permisos por compañia",
    user_details_title:"Detalles del usuario",
    logout_view_title:"Cerrar Sesión",
    logout_view_message:"¿Estás seguro que quieres cerrar la sesión?",
    permissions_names_by_id:permissionsStrings,
});


export default Strings;