package com.recetteapp.security.Feedback;

import com.recetteapp.security.Domaine.Domaine;
import com.recetteapp.security.Domaine.DomaineService;
import com.recetteapp.security.Domaine.domainerequest;
import com.recetteapp.security.Seance.SeanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v6/feedback")
@RequiredArgsConstructor
public class FeedbackController {
    private final FeedbackService service;
    private final FeedbackRepo repo;
    @PostMapping("/addfeedback")
    public ResponseEntity<Feedback> add(
            @RequestBody feedbackrequest request
    ) throws Exception {
        return ResponseEntity.ok(service.addfeed(request));
    }
    @DeleteMapping("/delfeed/{feedid}")
    public ResponseEntity<?> delete(@PathVariable Integer feedid) {
        try {

            return ResponseEntity.ok(service.deletefeed(feedid));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while processing the request");
        }

    }
    @GetMapping("/feedback/count/{year}")
    public List<feedbackcount> countFeedbacksByStatusAndDescription(@PathVariable int year) {
        List<Feedback> feedbacks = repo.findAll();
        Map<String, Long> feedbackCounts = feedbacks.stream()
                .filter(feedback -> feedback.getStatut().equals("KO") && feedback.getSeanceid().getProjectid().getDatedajout().getYear() == year )
                .collect(Collectors.groupingBy(Feedback::getDescription, Collectors.counting()));
        List<feedbackcount> result = new ArrayList<>();
        for (Map.Entry<String, Long> entry : feedbackCounts.entrySet()) {
            feedbackcount feedbackCount = new feedbackcount(entry.getKey(), entry.getValue());
            result.add(feedbackCount);
        }
        return result;
    }
}
