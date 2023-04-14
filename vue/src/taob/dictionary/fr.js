/* eslint-disable max-len */
export default {
	errorAccessToken: "Token invalide.",
	errorAccessTokenAdmin: "Token invalide.",
	errorAccessTokenManager: "Token invalide.",

	user: {
		get: "",
		create: "L'utilisateur a bien été créé.",
		put: "L'utilisateur a bien été modifié.",
		delete: "L'utilisateur a bien été supprimé.",
		forbiddenDelete: "Impossible de supprimer cette utilisateur.",
		emailAlreadyUse: "Cette adresse email est déjà utilisé.",
		nameAlreadyUse: "Ce nom est déjà utilisé.",
		telAlreadyUse: "Ce numéro de téléphone est déjà utilisé.",
		notfound: "Utilisateur demander introuvable.",
		name: "Le format du nom n'est pas conforme.",
		password: "Le format du mot de passe n'est pas conforme.",
		searchName: "Le format de 'searchName' n'est pas conforme.",
		tel: "Le format du numéro de téléphone n'est pas conforme.",
	},
	group: {
		create: "Le groupe a bien été créé.",
		edit: "Le groupe a bien été modifié.",
		delete: "Le groupe a bien été supprimé.",
		nameAlreadyUse: "Ce nom de groupe est déjà utilisé.",
		notfound: "Ce groupe n'existe pas.",
		emptyArray: "Aucun groupe n'a été sélectionné.",
		wrongArray: "Le format des groupes envoyé n'est pas le bon.",
		min1: "Il faut sélectionner minimum un groupe.",
	},
	link: {
		emailAlreadyUse: "Cette adresse email est déjà utilisé par un autre lien.",
		notExist: "Ce lien n'existe pas.",
		create: "Un lien a bien été créé et envoyé.",
		delete: "Le lien a bien été supprimé.",
	},
	availability: {
		post: "La disponibilité a bien été mis à jour."
	},
	mailer: {
		sendeError: "Une erreur est survenue lors de l'envoi du mail."
	},
	activity: {
		create: "Activités créées.",
		edit: "Activités modifiées.",
		notfound: "Activité introuvable.",
		delete: "Activités supprimées."
	},

	btn: {
		create: "créer",
		edit: "modifier",
		delete: "supprimer",
		yes: "oui",
		no: "non",
		close: "fermer",
		cancel: "annuler",
		validate: "valider",
		info: "information",
		remove: "retirer",
	},
	label: {
		name: "Nom",
		tel: "Numéro de téléphone",
		address: "Addresse physique",
		password: "Mot de passe",
		confirmPassword: "Confirmé mot de passe",
	},
	rules: {
		passwordIsnotsame: "Les mots de passe ne correspondent pas."
	},
	layouts: {
		guide: {
			availability: "Disponibilité",
			activity: "Activités",
			account: "Profile",

			planning: "Planning",
			admin: "Administration"
		},

		manager: {
			planning: "Planning",
			
			admin: "Administration",
			back: "Retour",
		},

		admin: {
			guides: "Guides",
			groups: "Groups",
			invits: "Invitations",
			logs: "logs",

			planning: "Planning",
			back: "Retour",
		},
	},

	"/": {
		title: "connexion à gegaire",
		invalideInputId: "Doit contenir entre 8 et 20 caractères.",
		btnConnect: "se connecter",
		wrongId: "L'identifiant est Invalides.",
		notfoundId: "Cet identifiant ne correspond à aucun utilisateur."
	},
	"/guide/availability": {
		title: "disponibilité",
		day: [
			"lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"
		],
		month: [
			"janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"
		],
		wrongMY: "",
		labelSelectGroup: "Groupe",
		labelNote: "Note",
		toatsAMPMUndefined: "Vous devez cocher une case de disponibilité.",
	},
	"/admin/guides": {
		title: "Gestionnaire des Guides.",
		btnAddGuide: "Créer un guide",
		labelSearchGuide: "Chercher un guide"
	},
	editGuide: {
		create: "Création d'un guide.",
		edit: "Édition d'un guide.",
		btnCreate: "créer",
		btnEdit: "modifier",
		btnDeletePopupTitle: "Êtes-vous sûr de vouloir supprimer le guide ?",
		btnDeletePopupSubTitle: "Cette action est irréversible et entraînera la suppression totale du guide.",
		form: {
			name: "Prénom du guide",
			tel: "Numéro de téléphone",
			email: "Adresse email",
			id: "ID de connexion",
			rules: {
				proCardMissing: "Cette valeur est requise.",
				proCardLessThan: "Cette valeur doit être inférieur à celle de l'expiration de la carte.",
				proCardMoreThan: "Cette valeur doit être supérieur à celle de la validité de la carte.",
			},
		}
	},
	"/admin/groups": {
		title: "Gestionnaire des Groupes.",
		labelCreate: "Nom du groupe",
		btnCreate: "créer le groupe",
		btnPopupTitle: "Confirmez-vous l'action ?",
		btnPopupSubTitle: "Cette action est définitive et elle aura pour conséquence la suppression totale du groupe et chaque guide l'ayant sans verra retirer",
	},
	"/admin/invits": {
		title: "Invitaions",
		btnAddLink: "créée une invitation",
		labelSearchLink: "Email",
		delete: {
			popupTitle: "Êtes-vous sûr de vouloir supprimer cette invitation ?",
			popupSubTitle: "La suppression de l'invitation rendra le lien envoyé par email invalide."
		}

	},
	"/manager/planning": {
		title: "Planning.",
		btnAddActivity: "Créer une activité."
	},
	editActivity: {
		titleCreate: "Création d'une activité.",
		titleEdit: "Édition d'une activité.",
		btnDeletePopupTitle: "Êtes-vous sûr de vouloir supprimer l'activité ?",
		btnDeletePopupSubTitle: "Cette action est irréversible et entraînera la suppression totale de l'activité.",
		form: {
			name: "Nom de l'activité",
			number: "Nombre de personnes",
			loc: "Adresse de l'activité",
			date: "Date de l'activité",
			hourStart: "Début de l'activité",
			hourEnd: "Fin de l'activité",
			datePassed: "La date doit être supérieure à celle d'aujourd'hui.",
			rules: {
				hourMissing: "Cette valeur est requise.",
				hourLessThan: "Cette valeur doit être inférieur à celle de la fin de l'activité.",
				hourMoreThan: "Cette valeur doit être supérieur à celle du commencement de l'activité.",
			}
		}
	},
	placeActivity: {
		title: "Placement des guides.",
		searchInput: "Guide",
		columnGuideSelectName: "Nom",
		columnGuideSelectLeader: "Leader",
		columnGuideSelectNote: "Note",
		columnGuideSelectAM: "AM",
		columnGuideSelectPM: "PM",

		columnGuideName: "Nom",
		columnGuideNote: "Note",
		columnGuideAvailable: "Dispo",

		infoName: "Nom",
		infoDate: "Date",
		infoGroup: "Group",
		infoAdresse: "Adresse",
		infoNumber: "Nombre",
		infoStart: "Com. à",
		infoEnd: "fini à",
		infoNote: "Note",

		placeAvailable: "Disponible",
		placeUnAvailable: "Indisponible",
		placeNote: "Note",
	},
	invit: {
		title: "Information a remplire."
	}
};