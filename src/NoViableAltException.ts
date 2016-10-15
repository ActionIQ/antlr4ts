﻿/*
 * [The "BSD license"]
 *  Copyright (c) 2012 Terence Parr
 *  Copyright (c) 2012 Sam Harwell
 *  All rights reserved.
 *
 *  Redistribution and use in source and binary forms, with or without
 *  modification, are permitted provided that the following conditions
 *  are met:
 *
 *  1. Redistributions of source code must retain the above copyright
 *     notice, this list of conditions and the following disclaimer.
 *  2. Redistributions in binary form must reproduce the above copyright
 *     notice, this list of conditions and the following disclaimer in the
 *     documentation and/or other materials provided with the distribution.
 *  3. The name of the author may not be used to endorse or promote products
 *     derived from this software without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE AUTHOR ``AS IS'' AND ANY EXPRESS OR
 *  IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 *  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY DIRECT, INDIRECT,
 *  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 *  DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 *  THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 *  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
 *  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
// ConvertTo-TS run at 2016-10-04T11:26:52.3255548-07:00

/** Indicates that the parser could not decide which of two or more paths
 *  to take based upon the remaining input. It tracks the starting token
 *  of the offending input and also knows where the parser was
 *  in the various paths when the error. Reported by reportNoViableAlternative()
 */
import { IntStream } from "./IntStream";
import { NotNull } from "./Decorators";
import { ParserRuleContext } from "./ParserRuleContext";
import { RecognitionException } from "./RecognitionException";
import { Token } from "./Token";
import { TokenStream } from "./TokenStream";
// Stubs
import {
    Recognizer, Parser, ATNConfigSet
} from "./misc/Stubs";


export class NoViableAltException extends RecognitionException {
	//private static serialVersionUID: number =  5096000008992867052L;

	/** Which configurations did we try at input.index() that couldn't match input.LT(1)? */
	private deadEndConfigs?: ATNConfigSet; 

	/** The token object at the start index; the input stream might
	 * 	not be buffering tokens so get a reference to it. (At the
	 *  time the error occurred, of course the stream needs to keep a
	 *  buffer all of the tokens but later we might not have access to those.)
	 */
	@NotNull
	private startToken: Token; 

	constructor(/*@NotNull*/ recognizer:Parser );
	constructor(
		/*@NotNull*/ recognizer: Recognizer<Token, any>,
		/*@NotNull*/ input: TokenStream,
		/*@NotNull*/ startToken: Token,
		/*@NotNull*/ offendingToken: Token,
		deadEndConfigs: ATNConfigSet | undefined,
		/*@NotNull*/ ctx: ParserRuleContext);

	constructor(
		recognizer: Recognizer<Token, any>,
		input?: TokenStream,
		startToken?: Token,
		offendingToken?: Token,
		deadEndConfigs?: ATNConfigSet,
		ctx?: ParserRuleContext)
	{

		if (recognizer instanceof Parser) {
			super(
				recognizer,
				recognizer.getInputStream(),
				recognizer._ctx
			);
			super.setOffendingToken(recognizer, recognizer.getCurrentToken())

		} else {
			super(recognizer, input, ctx);
			this.deadEndConfigs = deadEndConfigs;
			this.startToken = startToken as Token;
			super.setOffendingToken(recognizer, offendingToken);           
		}
	}

	getStartToken(): Token {
		return this.startToken;
	}

	getDeadEndConfigs(): ATNConfigSet | undefined {
		return this.deadEndConfigs;
	}

}
