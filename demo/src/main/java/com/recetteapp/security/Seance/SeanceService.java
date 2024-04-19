package com.recetteapp.security.Seance;

import com.recetteapp.security.Domaine.Domaine;
import com.recetteapp.security.Domaine.DomaineService;
import com.recetteapp.security.Domaine.Domaineinfo;
import com.recetteapp.security.Domaine.Domainerepo;
import com.recetteapp.security.Feedback.Feedback;
import com.recetteapp.security.Feedback.FeedbackRepo;
import com.recetteapp.security.email.EmailSender;
import com.recetteapp.security.exeption.UserNotFoundException;
import com.recetteapp.security.file.fileService;
import com.recetteapp.security.history.History;
import com.recetteapp.security.history.Historyrepo;
import com.recetteapp.security.project.ProjectRepository;
import com.recetteapp.security.project.ProjectService;
import com.recetteapp.security.project.project;
import com.recetteapp.security.user.UserRepository;
import com.recetteapp.security.user2.user2repo;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SeanceService {
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
    private final user2repo User2repo;
    private  final EmailSender emailSender;
    private final fileService FileService;
    private final DomaineService domaineService;
    private final Domainerepo domainerepo;
    public final SeanceRepo seanceRepo;
    private final Historyrepo historyrepo;
    private final FeedbackRepo feedrepo;
    public Seance register(seancerequest request) throws Exception {
        project Project = projectRepository.findById(request.getProjectid())
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        LocalDateTime now = LocalDateTime.now();
        LocalDateTime startTime = request.getStartTime();
        LocalDateTime endTime = request.getEndTime();
        if (startTime == null || startTime.isBefore(now)) {
            throw new InvalidRequestException("startTime must be in the future");
        }
        if (endTime != null && endTime.isBefore(startTime)) {
            throw new IllegalArgumentException("endTime must be after startTime");
        }

        List<Seance> existingseance = seanceRepo.findByProjectid(Project);
        for (Seance seance : existingseance) {
            if (!seance.getEtats().equals("séance terminée")) {
                throw new RuntimeException("A seance already exists with the same project and etats different from 'séance terminée'");
            }
        }List<Seance> existingseance2 = seanceRepo.findAll();
        for (Seance seance : existingseance2) {
            if (seance.getPoste().equals(request.getPoste())) {
                LocalDateTime seanceStartTime = seance.getStartTime();
                LocalDateTime seanceEndTime = seance.getEndTime();

                if ((request.getStartTime().isBefore(seanceEndTime) && request.getStartTime().isAfter(seanceStartTime)) ||
                        (request.getEndTime() != null && request.getEndTime().isBefore(seanceEndTime) && request.getEndTime().isAfter(seanceStartTime)) ||
                        (request.getStartTime().isEqual(seanceStartTime) && request.getEndTime().isEqual(seanceEndTime))) {
                    throw new RuntimeException("A seance already exists with the same date and time in the same poste");
                }
            }
        }




        Seance seance = Seance.builder()
                .startTime(startTime)
                .endTime(endTime)
                .poste(request.getPoste())
                .etats("Pas encore effectueé").statut("-")
                .projectid(Project).datedajout(LocalDateTime.now())
                .build();
       var savedseance= seanceRepo.save(seance);
        History history3= History.builder().nomprojet(seance.getProjectid().getName()).dateopeartion(LocalDateTime.now()).idprojet(seance.getProjectid().getId()).nomoperation("une séance a été ajouté  ").build();
        historyrepo.save(history3);
        project existingProject = projectRepository.findById(seance.getProjectid().getId())
                .orElseThrow(() -> new RuntimeException("Seance not found with id: " ));
        existingProject.setEtat("Recette  planifié");
        projectRepository.save(existingProject);
        emailSender.sendMeetingInvitation(existingProject.getDomaineid().getVavorga().getEmail(),existingProject.getName(),"Poste:"+seance.getPoste(),seance.getStartTime(),seance.getEndTime());
        emailSender.sendMeetingInvitation(existingProject.getDomaineid().getVav_metier().getEmail(),existingProject.getName(),"Poste:"+seance.getPoste(),seance.getStartTime(),seance.getEndTime());

        return savedseance;
    }

    public Seanceresponse findById(Integer id) {
        Seance seance = seanceRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Seance not found with id: " + id));
Seanceresponse seanceresponse=new Seanceresponse();
seanceresponse.setStartTime(seance.getStartTime());
seanceresponse.setEndTime(seance.getEndTime());
seanceresponse.setEtats(seance.getEtats());
seanceresponse.setId(seance.getId());
seanceresponse.setProjectname(seance.getProjectid().getName());
seanceresponse.setPoste(seance.getPoste());
        return seanceresponse;
    }
    public class InvalidRequestException extends RuntimeException {
        public InvalidRequestException(String message) {
            super(message);
        }
    }
    public class SeanceNotFoundException extends RuntimeException {
        public SeanceNotFoundException(String message) {
            super(message);
        }
    }
    @Scheduled(fixedDelay = 60000)
    public void updateSeanceEtats() {
        LocalDateTime now = LocalDateTime.now();

        List<Seance> seances = seanceRepo.findAll();
        for (Seance seance : seances) {
            LocalDateTime startTime = seance.getStartTime();
            LocalDateTime endTime = seance.getEndTime();
            String etats = seance.getEtats();

            if (etats.equals("séance terminée")) {
                continue;
            }

            if (endTime == null) {
                if (startTime.isBefore(now)) {
                    etats = "En cours";
                } else {
                    etats = "Pas encore effectué";
                }
            } else {
                if (endTime.isBefore(now)) {
                    etats = "séance terminée";
                    project existingProject = projectRepository.findById(seance.getProjectid().getId())
                            .orElseThrow(() -> new RuntimeException("Seance not found with id: " ));
                    existingProject.setEtat("En attente de feedback sur la séance ");
                    projectRepository.save(existingProject);
                    History history3= History.builder().nomprojet(seance.getProjectid().getName()).dateopeartion(LocalDateTime.now()).idprojet(seance.getProjectid().getId()).nomoperation("fin séance  ").build();
                    historyrepo.save(history3);
                } else if (startTime.isBefore(now)) {
                    etats = "En cours";
                } else {
                    etats = "Pas encore effectueé";
                }
            }

            seance.setEtats(etats);
            seanceRepo.save(seance);

        }
    }
    public Seance update(Integer id, seancerequest request) {
        Seance seance = seanceRepo.findById(id)
                .orElseThrow(() -> new UserNotFoundException("Seance not found"));

        LocalDateTime startTime = request.getStartTime();
        LocalDateTime endTime = request.getEndTime();


        if (startTime != null) {

            LocalDateTime now = LocalDateTime.now();
            if (startTime.isBefore(now)) {
                throw new InvalidRequestException("startTime must be in the future");
            }
            seance.setStartTime(startTime);
        }


        if (endTime != null) {

            if (seance.getStartTime() != null && endTime.isBefore(seance.getStartTime())) {
                throw new InvalidRequestException("endTime must be after startTime");
            }
            seance.setEndTime(endTime);
        }

        String poste = request.getPoste();
        if (poste != null) {
            seance.setPoste(poste);
        }
        Seance  savedseance=seanceRepo.save(seance);
        History history3= History.builder().nomprojet(seance.getProjectid().getName()).dateopeartion(LocalDateTime.now()).idprojet(seance.getProjectid().getId()).nomoperation("séance modifié  ").build();
        historyrepo.save(history3);

        return savedseance;
    }
    public boolean delete(Integer seanceId) throws SeanceNotFoundException {
        boolean verif=true;
        Seance optionalSeance = seanceRepo.findById(seanceId).orElseThrow(() -> new UserNotFoundException("User not found"));;
        project existingProject = projectRepository.findById(optionalSeance.getProjectid().getId())
                .orElseThrow(() -> new RuntimeException("Seance not found with id: " ));
        List<Seance> existingseance = seanceRepo.findByProjectid(existingProject);
        for (Seance seance : existingseance) {
            if (seance.getEtats().equals("séance terminée")&&!seance.getStatut().equals("-")) {
verif=false;
            }

        }
        if(!verif){seanceRepo.delete(optionalSeance);
            History history3= History.builder().nomprojet(optionalSeance.getProjectid().getName()).dateopeartion(LocalDateTime.now()).idprojet(optionalSeance.getProjectid().getId()).nomoperation("séance supprimé  ").build();
            historyrepo.save(history3);
            existingProject.setEtat("En attente de planification d'une autre séance");
       }else{existingProject.setEtat("en attente de planification");seanceRepo.delete(optionalSeance);
            History history3= History.builder().nomprojet(optionalSeance.getProjectid().getName()).dateopeartion(LocalDateTime.now()).idprojet(optionalSeance.getProjectid().getId()).nomoperation("séance supprimé  ").build();
            historyrepo.save(history3);
        }
        projectRepository.save(existingProject);
        return seanceRepo.findById(seanceId).isEmpty();
    }
    @Scheduled(fixedDelay = 60000) // runs every minute
    public void sendSeanceReminderEmails() throws MessagingException {
        List<Seance> seances = seanceRepo.findByEtatsAndEmailSent("séance terminée", false);
        for (Seance seance : seances) {
            try { EmailSender emailSender = new EmailSender();
            String subject = "Entité Recette ";
            String body = "l'entité recette attend  votre feedback sur la séance du projet :"+seance.getProjectid().getName();
            emailSender.sendEmail(seance.getProjectid().getDomaineid().getVavorga().getEmail(), subject, body);
            if (seance.getProjectid().getDomaineid().getRespEtude().getEmail() != null) {
                EmailSender emailSender2 = new EmailSender();
                String subject2 = "Entité Recette";
                String body2 = "l'entité recette vous informe que la session du projet  est  " + seance.getProjectid().getName() + " maintenant terminée.";
                emailSender2.sendEmail(seance.getProjectid().getDomaineid().getRespEtude().getEmail(), subject2, body2);
            }seance.setEmailSent(true);
            seanceRepo.save(seance); }catch (MessagingException e) {
                seance.setEmailSent(true);
                seanceRepo.save(seance);


            }
        }

    }

    @Scheduled(fixedDelay = 60000)
    public void sendSeanceRap() throws MessagingException {
        List<Seance> seances = seanceRepo.findByStatutAndEmailrapSent("-", false);
        for (Seance seance : seances) {
            LocalDateTime now = LocalDateTime.now();
            LocalDateTime endTime = seance.getEndTime();
            if (now.isAfter(endTime.plusDays(1))&&seance.getEtats().equals("séance terminée")) {
            try { EmailSender emailSender = new EmailSender();
                String subject = "Entité Recette: RAPPEL ";
                String body = "Bonjour "+seance.getProjectid().getDomaineid().getVavorga().getFirstname()+",<br>"+" l'entité recette attend toujours votre feedback sur la séance du projet :"+seance.getProjectid().getName();
                emailSender.sendEmail(seance.getProjectid().getDomaineid().getVavorga().getEmail(), subject, body);
                seance.setEmailrapSent(true);
                seanceRepo.save(seance); }catch (MessagingException e) {
                seance.setEmailrapSent(true);
                seanceRepo.save(seance);

            }
            }}
        }

    public List<Seanceresponse> findall() {
        List<Seance> seance = seanceRepo.findAll();
        if (seance.isEmpty()) {
            throw new SeanceService.SeanceNotFoundException("No domaine found.");
        }
        seance.sort(Comparator.comparing(Seance::getDatedajout).reversed());

        List<Seanceresponse> seanceresponses = new ArrayList<>();
        for (Seance seance1 :seance) {
            Seanceresponse seanceresponse = new Seanceresponse();
            seanceresponse.setStartTime(seance1.getStartTime());
            seanceresponse.setEndTime(seance1.getEndTime());
            seanceresponse.setEtats(seance1.getEtats());
            seanceresponse.setId(seance1.getId());
            seanceresponse.setProjectname(seance1.getProjectid().getName());
            seanceresponse.setPoste(seance1.getPoste());
seanceresponse.setStatut(seance1.getStatut());
        seanceresponses.add(seanceresponse);
    }
        return seanceresponses;
    }
    public List<Seanceresponse> findbyorgaemail(String email) {
        List<Seance> seance =seanceRepo.findByProjectidDomaineidVavorgaEmail(email);
        if (seance.isEmpty()) {
            throw new SeanceService.SeanceNotFoundException("No domaine found.");
        }
        seance.sort(Comparator.comparing(Seance::getDatedajout).reversed());
        List<Seanceresponse> seanceresponses = new ArrayList<>();
        for (Seance seance1 :seance) {
            Seanceresponse seanceresponse = new Seanceresponse();
            seanceresponse.setStartTime(seance1.getStartTime());
            seanceresponse.setEndTime(seance1.getEndTime());
            seanceresponse.setEtats(seance1.getEtats());
            seanceresponse.setId(seance1.getId());
            seanceresponse.setProjectname(seance1.getProjectid().getName());
            seanceresponse.setPoste(seance1.getPoste());
            seanceresponse.setStatut(seance1.getStatut());
            seanceresponses.add(seanceresponse);
        }
        return seanceresponses;
    }
    public List<seanceinfo> findall2() {
        List<Seance> seance = seanceRepo.findAll();
        if (seance.isEmpty()) {
            throw new SeanceService.SeanceNotFoundException("No domaine found.");
        }
        seance.sort(Comparator.comparing(Seance::getDatedajout).reversed());
        List<seanceinfo> seanceresponses = new ArrayList<>();
        for (Seance seance1 :seance) {
            seanceinfo seanceresponse = new seanceinfo();
            seanceresponse.setStartTime(seance1.getStartTime().toLocalDate().toString()+" à " +seance1.getStartTime().toLocalTime().toString());
            seanceresponse.setEndTime(seance1.getEndTime().toLocalDate().toString()+" à " +seance1.getEndTime().toLocalTime().toString());
            seanceresponse.setEtats(seance1.getEtats());
            seanceresponse.setId(seance1.getId());
            seanceresponse.setProjectname(seance1.getProjectid().getName());
            seanceresponse.setPoste(seance1.getPoste());
            seanceresponse.setStatut(seance1.getStatut());
            seanceresponses.add(seanceresponse);
        }
        return seanceresponses;
    }
    public List<seanceinfo> findbyorgaemail2(String email) {
        List<Seance> seance =seanceRepo.findByProjectidDomaineidVavorgaEmail(email);
        if (seance.isEmpty()) {
            throw new SeanceService.SeanceNotFoundException("No domaine found.");
        }   seance.sort(Comparator.comparing(Seance::getDatedajout).reversed());
        List<seanceinfo> seanceresponses = new ArrayList<>();
        for (Seance seance1 :seance) {
            seanceinfo seanceresponse = new seanceinfo();
            seanceresponse.setStartTime(seance1.getStartTime().toLocalDate().toString()+" à " +seance1.getStartTime().toLocalTime().toString());
            seanceresponse.setEndTime(seance1.getEndTime().toLocalDate().toString()+" à " +seance1.getEndTime().toLocalTime().toString());
            seanceresponse.setEtats(seance1.getEtats());
            seanceresponse.setId(seance1.getId());
            seanceresponse.setProjectname(seance1.getProjectid().getName());
            seanceresponse.setPoste(seance1.getPoste());
            seanceresponse.setStatut(seance1.getStatut());
            seanceresponses.add(seanceresponse);
        }
        return seanceresponses;
    }
    public int getSeancesCountByFilters(String email, String statut, String Etats) {
        List<Seance> seances = seanceRepo.findByProjectidDomaineidVavorgaEmailAndStatutAndEtats(email, statut, Etats);
        return seances.size();
    }
    public List<seanceinfo2> findbyprojectid(Integer id) {
        List<Seance> seance = seanceRepo.findSeanceByProjectidId(id);
        if (seance.isEmpty()) {
            throw new SeanceService.SeanceNotFoundException("No domaine found.");
        }
        seance.sort(Comparator.comparing(Seance::getDatedajout));
        List<seanceinfo2> seanceresponses = new ArrayList<>();
        for (Seance seance1 :seance) {
Feedback feedback= feedrepo.findBySeanceid(seance1);
            seanceinfo2 seanceresponse = new seanceinfo2();
            seanceresponse.setStartTime(seance1.getStartTime().toLocalDate().toString()+" à " +seance1.getStartTime().toLocalTime().toString());
            seanceresponse.setEndTime(seance1.getEndTime().toLocalDate().toString()+" à " +seance1.getEndTime().toLocalTime().toString());
            seanceresponse.setEtats(seance1.getEtats());
            seanceresponse.setId(seance1.getId());
            seanceresponse.setProjectname(seance1.getProjectid().getName());
            seanceresponse.setPoste(seance1.getPoste());
            seanceresponse.setStatut(seance1.getStatut());
            seanceresponse.setCause(feedback.getDescription());
            seanceresponses.add(seanceresponse);

        }
        return seanceresponses;
    }
}
