package com.aionys.notemanager.model.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Objects;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Note {
    @Id
    @SequenceGenerator(
            name = "note_seq",
            sequenceName = "note_seq",
            allocationSize = 1
    )
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "note_seq")
    private Long id;

    private String title;
    private String content;
    private LocalDateTime createdAt;

    public Note(String title, String content) {
        this.title = title;
        this.content = content;
        this.createdAt = LocalDateTime.now();
    }

    @Override
    public String toString() {
        return this.title + ": "
                + this.content
                + " [" + this.createdAt + "]";
    }

    @Override
    public boolean equals (Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Note note)) {
            return false;
        }
        return Objects.equals(this.id, note.id) &&
                Objects.equals(this.title, note.title) &&
                Objects.equals(this.content, note.content) &&
                Objects.equals(this.createdAt, note.createdAt);
    }

    @Override
    public int hashCode() {
        return Objects.hash(
                this.id, this.title,
                this.content, this.createdAt);
    }
}
