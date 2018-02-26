public class GestionTemps {
	static public Date prochaineDateHeure(int jourDeSemaine, int heure) {
		// Retrouve la prochaine date correspondant au prochain jour
		Calendar calendar = Calendar.getInstance();
		int diff = jourDeSemaine - calendar.get(Calendar.DAY_OF_WEEK);
		if (diff <= 0) {
			// Passe a la prochaine semaine si besoin
			diff += 7;
		}
		// Ajoute la difference
		calendar.add(Calendar.DAY_OF_MONTH, diff);
		// Modifie l'heure de debut
		calendar.set(Calendar.HOUR_OF_DAY, heure);
		return calendar.getTime()
	}
}