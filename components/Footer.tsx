import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { IContactItem, ICalendarItem } from "helpers/interface";
import Copyright from "components/Copyright";
import Button from "components/Button";
import Loading from "components/Loading";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { contactAdd } from "service/";
import dynamic from "next/dynamic";

/*
	Footer component
*/

const SingerMap = dynamic(() => import("components/SingerMap"), { ssr: false });

const contacts: Array<IContactItem> = [
	{
		icon: ["fas", "phone"],
		content: "+33 67 127 891 12",
	},
	{
		icon: ["fas", "envelope"],
		content: "chantepie@singer.fr",
	},
	{
		icon: ["fab", "facebook"],
		content: "Notre page Facebook",
		link: "https://www.facebook.com/SingerChantepie35",
	},
	{
		icon: ["fab", "instagram"],
		content: "Nous sommes sur Insta !",
		link: "https://instagram.com",
	},
];

const calendars: Array<ICalendarItem> = [
	{
		day: "L",
		opening: "Etablissement fermé.",
		opened: false,
	},
	{
		day: "M",
		opening: "9h30 à 13h - 14h30 à 18h30",
		opened: true,
	},
	{
		day: "M",
		opening: "9h30 à 13h - 14h30 à 18h30",
		opened: true,
	},
	{
		day: "J",
		opening: "9h30 à 13h - 14h30 à 18h30",
		opened: true,
	},
	{
		day: "V",
		opening: "9h30 à 13h - 14h30 à 18h30",
		opened: true,
	},
	{
		day: "S",
		opening: "10h à 13h30.",
		opened: true,
	},
	{
		day: "D",
		opening: "Etablissement fermé.",
		opened: false,
	},
];

const mappedContacts: Array<JSX.Element> = contacts.map(
	(contact: IContactItem) => (
		<li className="contacts__item" key={uuidv4()}>
			{contact.link && (
				<a className="contacts__link" href={contact.link} title="Aller voir">
					<Icon icon={contact.icon} /> {contact.content}
				</a>
			)}
			{!contact.link && (
				<span>
					<Icon icon={contact.icon} /> {contact.content}
				</span>
			)}
		</li>
	)
);

const mappedCalendar: Array<JSX.Element> = calendars.map(
	(calendar: ICalendarItem) => (
		<div className="contacts__calendar-col" key={uuidv4()}>
			<div className="contacts__calendar-row f-r-ce-ce border pd-top-5 pd-bottom-5">
				{calendar.day}
			</div>
			<div
				className={
					(calendar.opened
						? "contacts__calendar-row green b"
						: "contacts__calendar-row red") + " f-r-ce-ce b-b pd-t-5 pd-b-5"
				}
			>
				{calendar.opened && <Icon icon={["fas", "check-circle"]} />}
				{!calendar.opened && <Icon icon={["fas", "times-circle"]} />}
			</div>
		</div>
	)
);

const Footer = (): JSX.Element => {
	const [loading, setLoading] = useState<boolean>(false);
	const [caption, setCaption] = useState<string>("Souscrire à notre newsletter:");
	const [status, setStatus] = useState<number>(-1);

	// Submit newsletter
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
		e.preventDefault();
		if(!loading) {
			const formData = new FormData(e.currentTarget);
			const email = formData.get("email") as string;
			setLoading(true);
			contactAdd({email})
				.then(({caption, status}: {caption: string, status: number}) => {
					setCaption(caption);
					setStatus(status);
				})
				.catch(() => {
					setCaption("Une erreur est survenue.");
					setStatus(0);
				})
				.finally(() => setLoading(false));
		}
	};

	return (
		<section id="contacts" className="contacts bg-white">
			<div className="contacts__container ctn f-r-be-st">
				<div className="contacts__box w-30 pd-b-40">
					<h2 className="contacts__title pd-20 pd-l-0 pd-r-0">
						<Icon icon={["fas", "map-marker-alt"]} /> Localisation
					</h2>
					<div className="w-40 h-5px bg-theme br-5 mg-b-20"></div>
					<div className="contacts__map-box f-r-ce-ce w-100 h-200px br-5 o-h b-b">
						<SingerMap />
					</div>
				</div>
				<div className="contacts__box w-30 pd-b-40">
					<h2 className="contacts__title pd-20 pd-l-0 pd-r-0">
						<Icon icon={["fas", "envelope"]} /> Nous contacter
					</h2>
					<div className="w-40 h-5px bg-theme br-5 mg-b-20"></div>
					<ul className="contacts__list">{mappedContacts}</ul>
				</div>
				<div className="contacts__box w-30 pd-b-40">
					<h2 className="contacts__title pd-20 pd-l-0 pd-r-0">
						<Icon icon={["fas", "calendar-alt"]} /> Ouvertures
					</h2>
					<div className="w-40 h-5px bg-theme br-5 mg-b-20"></div>
					{/*<p className="contacts__about mg-b-20 tx-j">
						Notre magasin est ouvert en semaine, n&apos;hésitez pas à prendre contact
						avec nous les offres promotionnelles et venir nous voir directement !
					</p>*/}
					<p className="contacts__hours">Horaires: <span className="bold">9h</span> à <span className="bold">11h</span> - <span className="bold">14h</span> à <span className="bold">18h</span></p>
					<div className="contacts__calendar f-r-st-st w-100 b-b mg-t-20 o-h br-5">
						{mappedCalendar}
					</div>
					<p className={`${status === 1 ? 'green' : (status === 0 ? 'theme' : '')} pd-t-20 pd-b-20`}>{caption}</p>
					{!loading && (
						<form className="f-r-st-ce b-b br-10" onSubmit={handleSubmit}>
							<input
								className="input pd-10"
								name="email"
								placeholder="Adresse e-mail"

							/>
							<Button className="button" title="Souscrire">
								<React.Fragment>
									<Icon icon={["fas", "envelope"]} /> Souscrire
								</React.Fragment>
							</Button>
						</form>
					)}
					{loading && <Loading />}
				</div>
			</div>
			<Copyright />
		</section>
	);
}

export default Footer;
