package com.recetteapp.security.history;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.text.DecimalFormat;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class HistoryService {
    private final Historyrepo historyrepo;
    public History addoper(History request) throws Exception {

History history=History.builder().dateopeartion(LocalDateTime.now()).nomoperation(request.getNomoperation()).idprojet(request.getIdprojet()).build();
        var savedseance= historyrepo.save(history);


        return savedseance ;
    }
    public List<hisinfo> findHistory(Integer id)  {
        List<History> projects = historyrepo.findByIdprojet(id);

        projects.sort(Comparator.comparing(History::getDateopeartion));
        List<hisinfo> projectInfos = new ArrayList<>();
        for (History history : projects) {
            hisinfo projectInfo = new hisinfo();
            projectInfo.setId(history.getId());
            projectInfo.setDateopeartion(history.getDateopeartion().toLocalDate().toString()+" à "+history.getDateopeartion().toLocalTime().toString());
            projectInfo.setIdprojet(history.getIdprojet());
            projectInfo.setNomoperation(history.getNomoperation());
            projectInfos.add(projectInfo);
}

        return projectInfos;

    }
    public double calculateProjectDuration(Integer projectName) {
        List<History> histories = historyrepo.findByIdprojet(projectName);

        LocalDateTime startDate = null;
        LocalDateTime endDate = null;

        for (History history : histories) {
            if ("Projet ajouté".equals(history.getNomoperation())) {
                startDate = history.getDateopeartion();
            }else
            if ("Fin projet".equals(history.getNomoperation())) {
                endDate = history.getDateopeartion();
            }

            if (startDate != null && endDate != null) {
                Duration duration =Duration.between(startDate, endDate);
                long hours = duration.toHours() % 24;
                long minutes = duration.toMinutes() % 60;
                double days = duration.toHours() / 24.0;
                DecimalFormat df = new DecimalFormat("#.##"); // format to two decimal places
                String formattedDays = df.format(days);
                return days;
            }
        }

        // Return -1 if no duration was found
        return 0.0;
    }
    public double calculateAverageProjectDuration() {
        List<History> projectNames = historyrepo.findAll();

        Duration totalDuration = Duration.ZERO;
        int numProjects = 0;

        for (History projectName : projectNames) {
            double duration = calculateProjectDuration(projectName.getIdprojet());
            if (duration > 0) {
                totalDuration = totalDuration.plus(Duration.ofDays((long)duration));
                numProjects++;
            }
        }

        if (numProjects == 0) {
            // Return -1 if no durations were found
            return 0.0;
        } else {
            // Calculate the average duration and return it as a double
            double averageDuration = (double) totalDuration.toDays() / numProjects;
            return averageDuration;
        }
    }
    public int countRetourByYear(int year) {
        List<History> histories = historyrepo.findAll();
        int count = 0;
        for (History history : histories) {
            if (history.getNomoperation().equals("retour recette") && history.getDateopeartion().getYear() == year) {
                count++;
            }
        }
        return count;
    }

}
