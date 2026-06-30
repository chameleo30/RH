import { useState } from "react";
import api from "../api/api";

export default function DemandeConge() {
    const [dateDebut, setDateDebut] = useState("");
    const [dateFin, setDateFin] = useState("");
    const [motif, setMotif] = useState("");
    const [message, setMessage] = useState("");
    const [erreur, setErreur] = useState(null);


    const user = JSON.parse(localStorage.getItem("user"));

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = {
                employe: { id: user.id },
                dateDebut,
                dateFin,
                motif
            };

            console.log("Données envoyées :", data);

            await api.post("/conges/demande", data);

            setMessage("Demande envoyée avec succès !");
            setDateDebut("");
            setDateFin("");
            setMotif("");
            setTimeout(() => {
                setMessage('');
            }, 3000);

        } catch (error) {
            setErreur(error.response.data.message);
            setTimeout(() => {
                setErreur('');
            }, 3000);
        }
    };

    return (
        <>
            <div className="card">
                <h2>Demande de congé</h2>

                {message && <p className="message success-message">{message}</p>}
                {erreur && <p className="message error-message">{erreur}</p>}

                <form className="leave-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="type-conge">Type de congé</label>
                        <select
                            id="type-conge"
                            value={motif}
                            onChange={e => setMotif(e.target.value)}
                            required
                        >
                            <option value="">Sélectionner...</option>
                            <option value="Congé annuel">Congé annuel</option>
                            <option value="Congé maladie">Congé maladie</option>
                            <option value="Congé personnel">Congé personnel</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="date-debut">Date de début</label>
                        <input
                            id="date-debut"
                            type="date"
                            value={dateDebut}
                            onChange={e => setDateDebut(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="date-fin">Date de fin</label>
                        <input
                            id="date-fin"
                            type="date"
                            value={dateFin}
                            onChange={e => setDateFin(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="submit-btn">
                        Demander un congé
                    </button>
                </form>
            </div>
        </>

    );
}
