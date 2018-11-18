package com.vault.vault.persistence.models;

import javax.persistence.*;

/**
 * Created by User on 2018-11-02.
 */

@Entity
@Table(name = "FILE2TAGS",
        uniqueConstraints =
        @UniqueConstraint(columnNames = {"file_id", "tag_id"}))
public class File2Tags {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "f2t_Sequence")
    @SequenceGenerator(name = "f2t_Sequence", sequenceName = "F2T_SEQ")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "file_id", nullable = false)
    private File file;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tag_id", nullable = false)
    private Tag tag;

    public File2Tags() {

    }

    public File2Tags(File file, Tag tag) {
        this.file = file;
        this.tag = tag;
    }

    public File getFile() {
        return file;
    }

    public void setFile(File file) {
        this.file = file;
    }

    public Tag getTag() {
        return tag;
    }

    public void setTag(Tag tag) {
        this.tag = tag;
    }
}
