package com.recetteapp.security.project;

import com.recetteapp.security.Domaine.Domainerepo;
import com.recetteapp.security.auth.AuthenticationService;
import com.recetteapp.security.email.EmailSender;
import com.recetteapp.security.file.file;
import com.recetteapp.security.file.fileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static java.lang.Integer.parseInt;

@RestController
@RequestMapping("/api/v2/project")
@RequiredArgsConstructor
public class ProjectController {
    private final ProjectService projectService;
    private final fileService FileService;
    private final AuthenticationService authenticationService;
    private final ProjectRepository projectRepository;
    private final EmailSender emailSender;
    private final Domainerepo domainerepo;

    @GetMapping("/find/{id}")
    public ResponseEntity<project> getprojectById(@PathVariable("id") Integer id) {
        project Project = projectService.findProjectById(id);
        return new ResponseEntity<>(Project, HttpStatus.OK);
    }

    @GetMapping("/find2/{id}")
    public ResponseEntity<projectinfo> getprojectById2(@PathVariable("id") Integer id) throws Exception {
        projectinfo Project = projectService.findProjectById2(id);
        return new ResponseEntity<>(Project, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<addprojectresponse> addproject(
            @RequestBody addprojectrequest request

    ) {
        try {
            return ResponseEntity.ok(projectService.addProject(request));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/add2")
    public ResponseEntity<addprojectresponse> addprojecta(
            @RequestParam(required = false) MultipartFile file,
            @RequestParam(required = false) MultipartFile file2,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String description,
            @RequestParam(required = false) String url,

            @RequestParam(required = false) Boolean intervention,
            @RequestParam(required = false) Boolean envi,
            @RequestParam(required = false) String domaine
    ) {
        try {

            file attachment = FileService.saveAttachment(file);
            file attachment2 = FileService.saveAttachment(file2);
            addprojectrequest request = addprojectrequest.builder()
                    .name(name)
                    .description(description)
                    .url(url)
                    .domaine(domaine)
                    .dpt(attachment)
                    .t_u(attachment2)
                    .envi(envi).intervention(intervention)
                    .build();
            addprojectresponse saved = projectService.addProject(request);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<addprojectresponse> updateProject(
            @PathVariable Integer id,
            @RequestParam(required = false) MultipartFile file,
            @RequestParam(required = false) MultipartFile file2,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String description,
            @RequestParam(required = false) String url,

            @RequestParam(required = false) Boolean intervention,
            @RequestParam(required = false) Boolean envi,
            @RequestParam(required = false) String domaine
    ) {
        project existingProject = projectService.findProjectById(id);

        try {
            file attachment = null;
            file attachment2 = null;

            if (file != null) {
                attachment = FileService.saveAttachment(file);
            }
            if (file2 != null) {
                attachment2 = FileService.saveAttachment(file2);
            }
            addprojectrequest request = addprojectrequest.builder()
                    .name(name)
                    .description(description)
                    .url(url)

                    .dpt(attachment)
                    .t_u(attachment2).intervention(intervention).envi(envi)
                    .domaine(domaine)
                    .build();
            addprojectresponse response = projectService.updateProject(id, request);

            return ResponseEntity.ok(response);

        } catch (ProjectService.ProjectNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Boolean> deleteProject(@PathVariable Integer id) throws Exception {


        return ResponseEntity.ok(projectService.deleteProjectById(id));

    }

    @GetMapping("/projects")


    public ResponseEntity<List<projectinfo>> getAllusers() throws Exception {
        List<projectinfo> proj = projectService.findAllProjects2();
        return new ResponseEntity<>(proj, HttpStatus.OK);
    }

    @GetMapping("/projects2")


    public ResponseEntity<List<project>> getAllusers2() throws Exception {
        List<project> proj = projectService.findAllProjects();
        return new ResponseEntity<>(proj, HttpStatus.OK);
    }

    @GetMapping("/projects/{id}/files/{type}/id")
    public String getFileId(@PathVariable Integer id, @PathVariable String type) {
        return projectService.getFileId(id, type);
    }

    @PostMapping("/sendEmail/{id}")
    public ResponseEntity<String> sendEmail(
            @PathVariable Integer id,
            @RequestParam String[] toEmailAddresses,
            @RequestParam(required = false) String msg
    ) throws Exception {
        for (String toEmail : toEmailAddresses) {
            String message = "RECETTE-APP";
            String subject = "RECETTE: DEMANDE D'INTERVENTION";
            emailinfo abcd = projectService.sendEmail(id);
            project proj = projectService.findProjectById(id);

            String body = " Le projet <strong>" + proj.getName() + "</strong> nécessite une intervention de votre part ";
            if (msg != null && !msg.isEmpty()) {
                String attentionIcon = "&#9888;";
                body = body + "<br>" + attentionIcon + "<strong>Remarque de l'entité recette :</strong> " + msg + "";
            }
            if (abcd != null) {
                body = body + "<br> vous trouverez ci-joint le dpt du projet.<hr>";
                file attachment = abcd.getAttachment1();

                File file = new File(attachment.getFileName());
                FileOutputStream fos = new FileOutputStream(file);
                fos.write(attachment.getData());
                fos.close();


                emailSender.sendEmailAttachment(subject, message, toEmail, file, body);
            } else {
                EmailSender emailSender = new EmailSender();
                emailSender.sendEmail(toEmail, subject, body);
            }
        }
        return new ResponseEntity<>("Email sent successfully.", HttpStatus.OK);
    }

    @GetMapping("/vavorgaid2/{email}")


    public ResponseEntity<List<projectinfo>> getAllusers2(@PathVariable String email) throws Exception {
        List<projectinfo> proj = projectService.findAllProjects3(email);
        return new ResponseEntity<>(proj, HttpStatus.OK);
    }

    @GetMapping("/findbydomain/{email}")


    public ResponseEntity<List<project>> getbydomaine(@PathVariable String email) throws Exception {

        List<project> proj = projectRepository.findProjectByDomaineidVavorgaEmail(email);
        return new ResponseEntity<>(proj, HttpStatus.OK);
    }

    @GetMapping("/count/{etat}")
    public ResponseEntity<Integer> getSeancesCountByFilters(@PathVariable("etat") String etat) {
        int count = projectService.getSeancesCountByFilters(etat);
        return ResponseEntity.ok(count);
    }
    @GetMapping("/etat/count")
    public List<EtatCount> countProjectsByEtat() {
        List<project> projects = projectRepository.findAll();
        Map<String, Long> etatCounts = projects.stream()
                .collect(Collectors.groupingBy(project::getEtat, Collectors.counting()));
        List<EtatCount> result = new ArrayList<>();
        for (Map.Entry<String, Long> entry : etatCounts.entrySet()) {
            EtatCount etatCount = new EtatCount(entry.getKey(), entry.getValue());
            result.add(etatCount);
        }
        return result;
    }
    @GetMapping("/etat/count/{year}")
    public List<EtatCount> countProjectsByEtat(@PathVariable int  year) {
        List<project> projects = projectRepository.findAll();
        Map<String, Long> etatCounts = projects.stream()
                .filter(project -> project.getDatedajout().getYear() == year)
                .collect(Collectors.groupingBy(project::getEtat, Collectors.counting()));
        List<EtatCount> result = new ArrayList<>();
        for (Map.Entry<String, Long> entry : etatCounts.entrySet()) {
            EtatCount etatCount = new EtatCount(entry.getKey(), entry.getValue());
            result.add(etatCount);
        }
        return result;
    }
    @GetMapping("/etat/count/{year}/{month}")
    public List<EtatCount> countProjectsByEtat(@PathVariable int  year,@PathVariable int  month) {
        List<project> projects = projectRepository.findAll();
        Map<String, Long> etatCounts = projects.stream()
                .filter(project -> project.getDatedajout().getYear() == year && project.getDatedajout().getMonthValue() == month)                .collect(Collectors.groupingBy(project::getEtat, Collectors.counting()));
        List<EtatCount> result = new ArrayList<>();
        for (Map.Entry<String, Long> entry : etatCounts.entrySet()) {
            EtatCount etatCount = new EtatCount(entry.getKey(), entry.getValue());
            result.add(etatCount);
        }
        return result;
    }
    @GetMapping("/etat/count2/{year}")
    public long countProjectsByEtata(@PathVariable int year) {
        List<project> projects = projectRepository.findAll();
        long count = projects.stream()
                .filter(project -> project.getDatedajout().getYear() == year)
                .count();
        return count;
    }
    @GetMapping("/etat/count44/{year}/{resp}")
    public long countProjectsByvavresporga(@PathVariable int year, @PathVariable String resp) {
        List<project> projects = projectRepository.findAll();
        long count = projects.stream()
                .filter(project -> project.getDatedajout().getYear() == year && project.getDomaineid().getRespEtude().getEmail().equals(resp))
                .count();
        return count;
    }
}