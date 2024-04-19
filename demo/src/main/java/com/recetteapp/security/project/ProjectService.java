package com.recetteapp.security.project;

import com.recetteapp.security.Domaine.Domaine;
import com.recetteapp.security.Domaine.DomaineService;
import com.recetteapp.security.Domaine.Domainerepo;
import com.recetteapp.security.Seance.Seance;
import com.recetteapp.security.email.EmailSender;
import com.recetteapp.security.exeption.UserNotFoundException;
import com.recetteapp.security.file.file;
import com.recetteapp.security.file.fileService;
import com.recetteapp.security.history.History;
import com.recetteapp.security.history.Historyrepo;
import com.recetteapp.security.user.User;
import com.recetteapp.security.user.User2;
import com.recetteapp.security.user.UserRepository;
import com.recetteapp.security.user2.user2repo;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.io.File;
import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
public class ProjectService {
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
    private final user2repo User2repo;
    private  final EmailSender emailSender;
    private final fileService FileService;
    private final DomaineService domaineService;
    private final Domainerepo domainerepo;
    private final Historyrepo historyrepo;
    private String id1;
    private String id2;

    public project findProjectById(Integer id){
        return  projectRepository.findProjectById(id).orElseThrow(()-> new UserNotFoundException("Project not found"));
    }
    public addprojectresponse addProject(addprojectrequest request) throws Exception {



        Domaine domaine=null ;
        if (request.getDomaine() != null) {
            Optional<Domaine> domaineOptional = domainerepo.findByName(request.getDomaine());
            if (domaineOptional.isPresent()) {
                domaine = domaineOptional.get();
            } else {
                domaine = null;
            }
        } else {
            domaine = null;
        }
        String name=null;
        if (request.getName() != null) {
            name = request.getName();
            int count = 1;
            while (projectRepository.findByName(name).isPresent()) {
                name = request.getName() + " (" + count + ")";
                count++;
            }

        }
        else {name= request.getName();}
        project Project = project.builder()
                .name(name)
                .description(request.getDescription())
                .url(request.getUrl())

                .datedajout(LocalDateTime.now())
                .dpt_id(request.getDpt())
                .T_U(request.getT_u())
                .intervention(request.isIntervention())
                .envi(request.isEnvi())
                .etat(request.isEnvi() ? "en attente de planification" : "en cours de preparation de l'environnement")

                .domaineid(domaine)
                .build();


        project savedProject = projectRepository.save(Project);
        History history= History.builder().dateopeartion(LocalDateTime.now()).nomprojet(savedProject.getName()).idprojet(savedProject.getId()).nomoperation("Projet ajouté").build();
        historyrepo.save(history);
        if (request.isEnvi()) {
            EmailSender emailSender = new EmailSender();
            String subject = "Environnement pour le projet  "+request.getName() +" est prêt";
            String body = "Planifiez votre séance";
            emailSender.sendEmail(domaine.getVavorga().getEmail(), subject, body);

        }

        String dptName = null;
        if (request.getDpt() != null) {
            dptName = request.getDpt().getFileName();
        }
        String tuName = null;
        if(request.getT_u()!=null){ tuName=request.getT_u().getFileName();}
        EmailSender emailSender = new EmailSender();
        String subject = "Entité Recette";
        String body = "Bonjour "+savedProject.getDomaineid().getRespEtude().getFirstname()+",<br>"+" l'entité recette vous informe que le projet :"+savedProject.getName()+"a été ajouteé";
        emailSender.sendEmail(savedProject.getDomaineid().getRespEtude().getEmail(), subject, body);

        return addprojectresponse.builder()
                .name(savedProject.getName()).id(savedProject.getId())
                .datedajout(savedProject.getDatedajout())
                .dptname(dptName).tuname(tuName)
                .intervention(savedProject.isIntervention())
                .envi(savedProject.isEnvi())
                .Etat(savedProject.getEtat()).domaine(savedProject.getDomaineid())
                .build();
    }


    public addprojectresponse updateProject(Integer id, addprojectrequest request) throws Exception {
        project existingProject = projectRepository.findById(id)
                .orElseThrow(() -> new ProjectNotFoundException("Project not found with ID: " + id));
        project existingProject1 = projectRepository.findById(id)
                .orElseThrow(() -> new ProjectNotFoundException("Project not found with ID: " + id));
if(existingProject.getDpt_id()!=null) {
    this.id1 = existingProject1.getDpt_id().getId();
}if(existingProject.getT_U()!=null) {
        this.id2=existingProject1.getT_U().getId();}
        if (request.getName() != null) {
            existingProject.setName(request.getName());
        }
        if (request.getDescription() != null) {
            existingProject.setDescription(request.getDescription());
        }
        if (request.getUrl() != null) {
            existingProject.setUrl(request.getUrl());
        }

        if (request.getDomaine()!= null){
            Domaine domaine = domainerepo.findByName(request.getDomaine()).orElseThrow(() -> new UserNotFoundException("domaine not found"));

            existingProject.setDomaineid(domaine);

        }
        if (request.getDpt() != null) {



            existingProject.setDpt_id(request.getDpt());

        }
        if (request.getT_u() != null) {


            existingProject.setT_U(request.getT_u());

        }
        if (request.getEnvi1() != null) {
            existingProject.setEnvi(Boolean.parseBoolean(request.getEnvi1()));

        }
        if (request.getIntervention1() != null) {
            existingProject.setIntervention(Boolean.parseBoolean(request.getIntervention1()));
        }
        if (request.isEnvi()) {
            existingProject.setEtat("en attente de planification");
            EmailSender emailSender = new EmailSender();
            String subject = "Environnement pour le projet  "+request.getName() +" est prêt";
            String body = "Planifiez votre séance";
            emailSender.sendEmail(existingProject1.getDomaineid().getVavorga().getEmail(), subject, body);

        } else {
            existingProject.setEtat("en cours de preparation de l'environnement");
        }

        project updatedProject = projectRepository.save(existingProject);
        History history3= History.builder().nomprojet(updatedProject.getName()).dateopeartion(LocalDateTime.now()).idprojet(existingProject.getId()).nomoperation("le projet a été modifié").build();
        historyrepo.save(history3);
        if (request.getDpt() != null&&this.id1!=null) {
            this.deleteolffiles(this.id1); }
        if (request.getT_u() != null&&this.id1!=null) {
            this.deleteolffiles( this.id2);   }

        return addprojectresponse.builder()
                .name(updatedProject.getName())
                .datedajout(updatedProject.getDatedajout())

                .build();

    }
public void deleteolffiles(String id) throws Exception {
        FileService.deleteAttachment(id);



}
    public class ProjectNotFoundException extends RuntimeException {
        public ProjectNotFoundException(String message) {
            super(message);
        }
    }


    public boolean deleteProjectById(Integer id) throws Exception {

            project Project = projectRepository.findProjectById(id)
                    .orElseThrow(() -> new ProjectNotFoundException("Project not found with ID: " + id));
            String file1id = null;
            String file2id = null;
            if (Project.getDpt_id() != null) {
                file1id = Project.getDpt_id().getId();
            }
            if (Project.getT_U() != null) {
                file2id = Project.getT_U().getId();
            }
            projectRepository.deleteById(id);
        History history4= History.builder().nomprojet(Project.getName()).dateopeartion(LocalDateTime.now()).idprojet(Project.getId()).nomoperation("le projet  a été supprimé").build();
        historyrepo.save(history4);
            if (file1id != null) {
                FileService.deleteAttachment(file1id);
            }
            if (file2id != null) {
                FileService.deleteAttachment(file2id);
            }




        return projectRepository.findProjectById(id).isEmpty();

    }


    public List<project> findAllProjects() {
        List<project> projects = projectRepository.findAll();
        if (projects.isEmpty()) {
            throw new ProjectNotFoundException("No projects found.");
        }


        return projects;
    }
    public List<projectinfo> findAllProjects2() throws Exception {
        List<project> projects = projectRepository.findAll();
        if (projects.isEmpty()) {
            throw new ProjectNotFoundException("No projects found.");
        }
        projects.sort(Comparator.comparing(project::getDatedajout).reversed());

        List<projectinfo> projectInfos = new ArrayList<>();
        for (project project : projects) {
            projectinfo projectInfo = new projectinfo();
            projectInfo.setId(project.getId());
            projectInfo.setName(project.getName());
            projectInfo.setDescription(project.getDescription());
            projectInfo.setUrl(project.getUrl());
            projectInfo.setDatedajout(project.getDatedajout());
            projectInfo.setDate(project.getDatedajout().toLocalDate());
            projectInfo.setTime(project.getDatedajout().toLocalTime());
projectInfo.setEtat(project.getEtat());

projectInfo.setDomaine(project.getDomaineid().getName());
            if (project.getDpt_id() != null) {
                file dptFile = FileService.getAttachment(project.getDpt_id().getId());

                projectInfo.setDpt_file_name(dptFile.getFileName());
            }

            if (project.getT_U() != null) {
                file tuFile = FileService.getAttachment(project.getT_U().getId());

                projectInfo.setTu_file_name(tuFile.getFileName());
            }

            projectInfos.add(projectInfo);
        }


        return projectInfos;
    }
    public projectinfo findProjectById2(Integer id) throws Exception {
        project project = projectRepository.findProjectById(id)
                .orElseThrow(() -> new ProjectNotFoundException("Project not found with ID: " + id));

        projectinfo projectInfo = new projectinfo();
        projectInfo.setId(project.getId());
        projectInfo.setName(project.getName());
        projectInfo.setDescription(project.getDescription());
        projectInfo.setUrl(project.getUrl());
        projectInfo.setDatedajout(project.getDatedajout());
        projectInfo.setDate(project.getDatedajout().toLocalDate());
        projectInfo.setTime(project.getDatedajout().toLocalTime());
        projectInfo.setDomaine(project.getDomaineid().getName());

        // Fetch and set the names of the related objects


        if (project.getDpt_id() != null) {
            file dptFile = FileService.getAttachment(project.getDpt_id().getId());
            projectInfo.setDpt_file_name(dptFile.getFileName());
        }

        if (project.getT_U() != null) {
            file tuFile = FileService.getAttachment(project.getT_U().getId());
            projectInfo.setTu_file_name(tuFile.getFileName());
        }

        return projectInfo;
    }
    public String getFileId(Integer projectId, String fileType) {
        project Project = projectRepository.findProjectById(projectId)
                .orElseThrow(() -> new ProjectNotFoundException("Project not found with ID: " + projectId));
        if (fileType.equals("dpt")) {
            return Project.getDpt_id().getId();
        } else if (fileType.equals("tu")) {
            return Project.getT_U().getId();
        } else {
            throw new IllegalArgumentException("Invalid file type: " + fileType);
        }
    }

    public emailinfo sendEmail(Integer projectId) {
        emailinfo emailinfo = new emailinfo();
        try {
            project project = findProjectById(projectId);
            String File1Id = project.getDpt_id().getId();
            file attachment1 = FileService.getAttachment(File1Id);
            emailinfo.setAttachment1(attachment1);
        } catch (Exception e) {
            System.out.println("Exception occurred while sending email: " + e.getMessage());
            return null;
        }
        return emailinfo;
    }

    public List<projectinfo> findAllProjects3(String email) throws Exception {
        List<project> projects = projectRepository.findProjectByDomaineidVavorgaEmail(email);
        if (projects.isEmpty()) {
            throw new ProjectNotFoundException("No projects found.");
        }
        projects.sort(Comparator.comparing(project::getDatedajout).reversed());

        List<projectinfo> projectInfos = new ArrayList<>();
        for (project project : projects) {
            if ((!project.getEtat().equals("en cours de preparation de l'environnement"))&&(!project.getEtat().equals("Retour recette"))) {
                projectinfo projectInfo = new projectinfo();
                projectInfo.setId(project.getId());
                projectInfo.setName(project.getName());
                projectInfo.setDescription(project.getDescription());
                projectInfo.setUrl(project.getUrl());
                projectInfo.setDatedajout(project.getDatedajout());
                projectInfo.setDate(project.getDatedajout().toLocalDate());
                projectInfo.setTime(project.getDatedajout().toLocalTime());
                projectInfo.setEtat(project.getEtat());

                projectInfo.setDomaine(project.getDomaineid().getName());
                if (project.getDpt_id() != null) {
                    file dptFile = FileService.getAttachment(project.getDpt_id().getId());

                    projectInfo.setDpt_file_name(dptFile.getFileName());
                }

                if (project.getT_U() != null) {
                    file tuFile = FileService.getAttachment(project.getT_U().getId());

                    projectInfo.setTu_file_name(tuFile.getFileName());
                }

                projectInfos.add(projectInfo);
            }
        }

        return projectInfos;
    }

    public int getSeancesCountByFilters(String Etat) {
        List<project> seances = projectRepository.findProjectByEtat(Etat);
        return seances.size();
    }


}










