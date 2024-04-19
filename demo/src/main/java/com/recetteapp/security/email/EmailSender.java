package com.recetteapp.security.email;

import com.recetteapp.security.file.file;
import jakarta.activation.DataHandler;
import jakarta.mail.*;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeBodyPart;
import jakarta.mail.internet.MimeMessage;
import jakarta.mail.internet.MimeMultipart;
import jakarta.mail.util.ByteArrayDataSource;
import net.fortuna.ical4j.model.Calendar;
import net.fortuna.ical4j.model.DateTime;
import net.fortuna.ical4j.model.component.VEvent;
import net.fortuna.ical4j.model.parameter.Cn;
import net.fortuna.ical4j.model.parameter.Role;
import net.fortuna.ical4j.model.property.*;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.net.URI;
import java.nio.file.Path;
import java.time.LocalDateTime;

import java.time.ZoneId;
import java.util.Date;
import java.util.Properties;
@Component
public class EmailSender {

    public void sendEmail(String recipientEmail, String subject, String body) throws MessagingException {

        String senderEmail = "jaouher3009@gmail.com";
        String senderPassword = "vcvlrmhinnscgvbz";
        Properties props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", "smtp.gmail.com");
        props.put("mail.smtp.port", "587");

        Authenticator auth = new Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(senderEmail, senderPassword);
            }
        };
        Session session = Session.getInstance(props, auth);


        Message message = new MimeMessage(session);
        message.setFrom(new InternetAddress(senderEmail));
        message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(recipientEmail));
        message.setSubject(subject);
        message.setContent(body, "text/html"); // Set the content type to "text/html"


        Transport.send(message);
    }
    public void sendEmailAttachment(final String subject, final String message,
                                    final String toEmailAddresses, final File attachment,final String body) {

        String senderEmail = "jaouher3009@gmail.com";
        String senderPassword = "vcvlrmhinnscgvbz";
        Properties props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", "smtp.gmail.com");
        props.put("mail.smtp.port", "587");
        try {
            Authenticator auth = new Authenticator() {
                protected PasswordAuthentication getPasswordAuthentication() {
                    return new PasswordAuthentication(senderEmail, senderPassword);
                }
            };
            Session session = Session.getInstance(props, auth);

            MimeMessage mimeMessage = new MimeMessage(session);
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
            helper.setFrom(new InternetAddress(senderEmail));
            helper.setTo(toEmailAddresses);
            helper.setSubject(subject);
helper.setText(body, true);




            // attach the file into email body
            FileSystemResource file = new FileSystemResource(attachment);
            helper.addAttachment( attachment.getName(), file);

            Transport.send(mimeMessage);

            System.out.println("Email sending complete.");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    public void sendMeetingInvitation(String recipientEmail, String subject, String location, LocalDateTime startDate, LocalDateTime endDate) throws Exception {
        String senderEmail = "jaouher3009@gmail.com";
        String senderPassword = "vcvlrmhinnscgvbz";
        Properties props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", "smtp.gmail.com");
        props.put("mail.smtp.port", "587");
        Session session = Session.getInstance(props, new Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(senderEmail, senderPassword);
            }
        });

        // Create the iCalendar message
        Calendar calendar = new Calendar();
        calendar.getProperties().add(new ProdId("-//Events Calendar//iCal4j 1.0//EN"));
        calendar.getProperties().add(Version.VERSION_2_0);
        calendar.getProperties().add(CalScale.GREGORIAN);


        DateTime start = new DateTime(Date.from(startDate.atZone(ZoneId.systemDefault()).toInstant()));
        DateTime end = new DateTime(Date.from(endDate.atZone(ZoneId.systemDefault()).toInstant()));

        VEvent meeting = new VEvent(start, end, subject);
        meeting.getProperties().add(new Description("Discuss project status"));
        meeting.getProperties().add(new Location(location));

        // Add attendees to the meeting
        Attendee attendee = new Attendee(URI.create("mailto:" + recipientEmail));
        attendee.getParameters().add(Role.REQ_PARTICIPANT);
        attendee.getParameters().add(new Cn("Recipient Name"));
        meeting.getProperties().add(attendee);

        calendar.getComponents().add(meeting);

        // Create the email message with the iCalendar attachment
        MimeMessage message = new MimeMessage(session);
        message.setFrom(new InternetAddress(senderEmail));
        message.setRecipient(Message.RecipientType.TO, new InternetAddress(recipientEmail));
        message.setSubject(subject);

        Multipart multipart = new MimeMultipart();
        BodyPart messageBodyPart = new MimeBodyPart();
        messageBodyPart.setText("Please find the meeting invitation attached.");
        multipart.addBodyPart(messageBodyPart);

        messageBodyPart = new MimeBodyPart();
        messageBodyPart.setDataHandler(new DataHandler(new ByteArrayDataSource(calendar.toString(), "text/calendar")));
        messageBodyPart.setFileName("meeting.ics");
        multipart.addBodyPart(messageBodyPart);

        message.setContent(multipart);

        // Send the email
        Transport.send(message);
    }
}


