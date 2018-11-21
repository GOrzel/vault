package com.vault.vault.logic.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Created by User on 2018-11-21.
 */
@ResponseStatus(HttpStatus.BAD_REQUEST)
public class TagDuplicateException extends RuntimeException{
    public TagDuplicateException(String message) {
        super(message);
    }

    public TagDuplicateException(String message, Throwable cause) {
        super(message, cause);
    }
}