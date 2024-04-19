package com.recetteapp.security.Feedback;

import com.recetteapp.security.Domaine.DomaineService;
import com.recetteapp.security.Domaine.Domainerepo;
import com.recetteapp.security.Seance.Seance;
import com.recetteapp.security.Seance.SeanceRepo;
import com.recetteapp.security.Seance.seancerequest;
import com.recetteapp.security.email.EmailSender;
import com.recetteapp.security.exeption.UserNotFoundException;
import com.recetteapp.security.file.fileService;
import com.recetteapp.security.history.History;
import com.recetteapp.security.history.Historyrepo;
import com.recetteapp.security.project.ProjectRepository;
import com.recetteapp.security.project.ProjectService;
import com.recetteapp.security.project.project;
import com.recetteapp.security.user.User2;
import com.recetteapp.security.user.UserRepository;
import com.recetteapp.security.user2.user2repo;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FeedbackService {
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
    private final user2repo User2repo;
    private  final EmailSender emailSender;
    private final fileService FileService;
    private final DomaineService domaineService;
    private final Domainerepo domainerepo;
    public final SeanceRepo seanceRepo;
    public final FeedbackRepo feedRepo;
    private final Historyrepo historyrepo;

    public Feedback addfeed(feedbackrequest request) throws MessagingException {
        String desc=null;

        Seance seance = seanceRepo.findById(request.getSeanceid())
                .orElseThrow(() -> new UserNotFoundException("User not found"));
        Feedback feedback2=feedRepo.findBySeanceid(seance);


        if(request.getDescription()!=null)
        {desc= request.getDescription();}

Feedback feedback=Feedback.builder()
        .seanceid(seance)
        .description(desc)
        .finale(request.isFinale())
        .statut(request.getStatut()).build();
        feedRepo.save(feedback);
        History history= History.builder().dateopeartion(LocalDateTime.now()).nomprojet(feedback.getSeanceid().getProjectid().getName()).idprojet(feedback.getSeanceid().getProjectid().getId()).nomoperation("feedback  ajouté").build();
        historyrepo.save(history);
        seance.setStatut(feedback.getStatut());
        seanceRepo.save(seance);
        project existingProject = projectRepository.findById(seance.getProjectid().getId())
                .orElseThrow(() -> new RuntimeException("Seance not found with id: " ));
        if (feedback.isFinale()) {
            existingProject.setEtat("Cloturé");
            projectRepository.save(existingProject);
            History history2= History.builder().dateopeartion(LocalDateTime.now()).nomprojet(existingProject.getName()).idprojet(existingProject.getId()).nomoperation("Fin projet").build();
            historyrepo.save(history2);
            if((feedback.getDescription().equals("Absence du vav metier") )){
                User2 user2=User2repo.findById(seance.getProjectid().getDomaineid().getVav_metier().getId()).orElseThrow(() -> new UserNotFoundException("User not found with ID: " ));
                user2.setNbabs(user2.getNbabs()+1);
                User2repo.save(user2);}
           }else if (feedback.getStatut().equals("OK")){
            existingProject.setEtat("En attente de planification d'une autre séance");
            projectRepository.save(existingProject);
            History history2= History.builder().dateopeartion(LocalDateTime.now()).nomprojet(existingProject.getName()).idprojet(existingProject.getId()).nomoperation("OK en attente de replanification").build();
            historyrepo.save(history2);

        }else
        if(feedback.getDescription().equals("Absence du vav metier") ){

            User2 user2=User2repo.findById(seance.getProjectid().getDomaineid().getVav_metier().getId()).orElseThrow(() -> new UserNotFoundException("User not found with ID: " ));
            user2.setNbabs(user2.getNbabs()+1);
            User2repo.save(user2);
            existingProject.setEtat("en attente de planification");
            projectRepository.save(existingProject);
            History history2= History.builder().dateopeartion(LocalDateTime.now()).nomprojet(existingProject.getName()).idprojet(existingProject.getId()).nomoperation("KO en attente de replanification").build();
            historyrepo.save(history2);
            EmailSender emailSender = new EmailSender();
            String subject = "Entité recette";
            String body = "veuillez coordonner avec le vis-à-vis métier ' "+existingProject.getDomaineid().getVav_metier().getFirstname()+" "+existingProject.getDomaineid().getVav_metier().getLastname()+" ' et  replanifier votre séance pour le projet "+existingProject.getName()+" selon votre calendrier";
            emailSender.sendEmail(existingProject.getDomaineid().getVavorga().getEmail(), subject, body);
        }else {existingProject.setEnvi(false);
            existingProject.setEtat("Retour recette");
            projectRepository.save(existingProject);
            History history2= History.builder().dateopeartion(LocalDateTime.now()).nomprojet(existingProject.getName()).idprojet(existingProject.getId()).nomoperation("retour recette").build();
            historyrepo.save(history2);

        }
        return feedback;
    }
    public class FeedbackAlreadyExistsException extends RuntimeException {
        public FeedbackAlreadyExistsException(String message) {
            super(message);
        }
    }



    public boolean deletefeed(Integer id) throws Exception {
          Seance seance = seanceRepo.findById(id)
                .orElseThrow(() -> new UserNotFoundException("Seance not found with ID: " + id));
        project existingProject = projectRepository.findById(seance.getProjectid().getId())
                .orElseThrow(() -> new RuntimeException("Project not found with id: " + seance.getProjectid().getId()));
        Feedback feedback = feedRepo.findBySeanceid(seance);

        existingProject.setEtat("En attente de feedback sur la séance ");
        projectRepository.save(existingProject);
        seance.setStatut("-");

        seanceRepo.save(seance);

        if(feedback.getDescription().equals("Absence du vav metier")){
            User2 user2=User2repo.findById(seance.getProjectid().getDomaineid().getVav_metier().getId())
                    .orElseThrow(() -> new UserNotFoundException("User not found with ID: " ));
            user2.setNbabs(user2.getNbabs()-1);
            User2repo.save(user2);
        }

        feedRepo.deleteById(feedback.getId());
        History history3= History.builder().dateopeartion(LocalDateTime.now()).nomprojet(existingProject.getName()).idprojet(existingProject.getId()).nomoperation("feedback supprimé").build();
        historyrepo.save(history3);
        return feedRepo.findById(feedback.getId()).isEmpty();
    }

    @Scheduled(fixedDelay = 60000) // runs every minute
    public void checkSeanceStatus() {
        List<Seance> seances = seanceRepo.findByStatut("-");
        for (Seance seance : seances) {
            LocalDateTime now = LocalDateTime.now();
            LocalDateTime endTime = seance.getEndTime();

            if (now.isAfter(endTime.plusDays(2))&&seance.getEtats().equals("séance terminée")) {
                Feedback feedback = Feedback.builder()
                        .seanceid(seance)
                        .description("Automatic feedback generated")
                        .finale(true)
                        .statut("OK")
                        .build();
                feedRepo.save(feedback);
                seance.setStatut(feedback.getStatut());
                seanceRepo.save(seance);
                project existingProject = projectRepository.findById(seance.getProjectid().getId())
                        .orElseThrow(() -> new RuntimeException("Project not found with id: " + seance.getProjectid().getId()));
                existingProject.setEtat("Cloturé");

                projectRepository.save(existingProject);
                History history3= History.builder().dateopeartion(LocalDateTime.now()).nomprojet(existingProject.getName()).idprojet(existingProject.getId()).nomoperation("Fin projet").build();
                historyrepo.save(history3);
            }
        }
    }

}
