import { useEffect, useState } from "react";
import api from "../api/api";

export default function EmployeesList() {
    const [employes, setEmployes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [erreur, setErreur] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterDepartement, setFilterDepartement] = useState('');

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));

        if (!user) {
            setErreur("Utilisateur non connecté.");
            setLoading(false);
            return;
        }

        // Charger la liste des employés
        api.get(`/employes/departement/${user.departement.id}`)
            .then(response => {
                setEmployes(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Erreur chargement employés :", error);
                setErreur("Impossible de charger la liste des employés.");
                setLoading(false);
            });
    }, []);

    // Filtrer les employés
    const employesFiltres = employes.filter(employe => {
        const matchSearch =
            employe.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
            employe.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
            employe.email.toLowerCase().includes(searchTerm.toLowerCase());

        const matchDepartement =
            filterDepartement === '' ||
            employe.departement?.nom === filterDepartement;

        return matchSearch && matchDepartement;
    }).filter((employe) => employe.role === "EMPLOYE");

    // Obtenir la liste unique des départements
    const departements = [...new Set(employes.map(e => e.departement?.nom).filter(Boolean))];

    if (loading) return <p className="loading-message">Chargement...</p>;
    if (erreur) return <p className="error-message">{erreur}</p>;

    return (
        <div className="card employees-list-card">
            <h2>Liste des Employés</h2>
            <div className="employees-filters">
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="🔍 Rechercher un employé..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                </div>

                {/* Statistiques */}
                <div className="employees-stats">
                    <div className="stat-item">
                        <span className="stat-number">{employesFiltres.length}</span>
                        <span className="stat-label">Employé(s)</span>
                    </div>
                </div>
            </div>

            {/* Filtres */}
            <div className="employees-filters">


                {/* Liste des employés */}
                
                    {employesFiltres.length > 0 ? (
                        <div className="employees-table-container">
                        <table className="employees-table">
                            <thead>
                                <tr>
                                    <th>Nom</th>
                                    <th>Prénom</th>
                                    <th>Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employesFiltres.map((employe) => (
                                        <tr key={employe.id}>
                                            <td>{employe.nom}</td>
                                            <td>{employe.prenom}</td>
                                            <td>{employe.email}</td>
                                        </tr>
                                    ))}

                            </tbody>
                        </table>
                        </div>
                    ) : (
                        <div className="empty-state">
                            <p>Aucun employé trouvé</p>
                        </div>
                    )}
                </div>
            
        </div>
    );
}