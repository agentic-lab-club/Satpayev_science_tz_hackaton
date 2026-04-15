package ai

import (
	"time"
)

type ResponseEnvelope[T any] struct {
	RequestID string           `json:"request_id"`
	Status    string           `json:"status"`
	Data      T                `json:"data"`
	Error     *ErrorDetail     `json:"error,omitempty"`
	Metadata  ResponseMetadata `json:"metadata"`
}

type ErrorDetail struct {
	Code    string `json:"code"`
	Message string `json:"message"`
	Details any    `json:"details,omitempty"`
}

type ResponseMetadata struct {
	GeneratedAt time.Time `json:"generated_at"`
}

type DocumentMetadata struct {
	FilePath       string `json:"file_path,omitempty"`
	Filename       string `json:"filename"`
	ContentType    string `json:"content_type"`
	CharacterCount int    `json:"character_count"`
	Parser         string `json:"parser"`
}

type NotebookStructureSection struct {
	Title   string `json:"title"`
	Content string `json:"content"`
	Length  int    `json:"length"`
}

type NotebookStructure struct {
	Sections              []NotebookStructureSection `json:"sections"`
	FoundSections         []string                   `json:"found_sections"`
	MissingSections       []string                   `json:"missing_sections"`
	WeakSections          []string                   `json:"weak_sections"`
	EmptySections         []string                   `json:"empty_sections"`
	MatchedRequiredFields map[string]string          `json:"matched_required_sections"`
}

type NotebookSemanticIssue struct {
	IssueType      string `json:"issue_type"`
	Section        string `json:"section"`
	Quote          string `json:"quote"`
	Explanation    string `json:"explanation"`
	Recommendation string `json:"recommendation"`
}

type NotebookSemantic struct {
	Ambiguities     []NotebookSemanticIssue `json:"ambiguities"`
	Contradictions  []NotebookSemanticIssue `json:"contradictions"`
	MissingElements []NotebookSemanticIssue `json:"missing_elements"`
	Requirements    []NotebookSemanticIssue `json:"requirements"`
	Deadlines       []NotebookSemanticIssue `json:"deadlines"`
	KPIs            []NotebookSemanticIssue `json:"kpis"`
	ExpectedResults []NotebookSemanticIssue `json:"expected_results"`
}

type NotebookScore struct {
	TotalScore  float64            `json:"total_score"`
	Breakdown   map[string]float64 `json:"breakdown"`
	Explanation []string           `json:"explanation"`
}

type NotebookImprovedTZ struct {
	SummaryOfChanges []string `json:"summary_of_changes"`
	ImprovedText     string   `json:"improved_text"`
}

type NotebookEntity struct {
	Value      string  `json:"value"`
	Section    string  `json:"section"`
	Confidence float64 `json:"confidence"`
}

type NotebookEntityBundle struct {
	Requirements    []NotebookEntity `json:"requirements"`
	Deadlines       []NotebookEntity `json:"deadlines"`
	KPIs            []NotebookEntity `json:"kpis"`
	ExpectedResults []NotebookEntity `json:"expected_results"`
}

type Section struct {
	Key            string  `json:"key"`
	Title          string  `json:"title"`
	ContentExcerpt string  `json:"content_excerpt"`
	StartIndex     *int    `json:"start_index,omitempty"`
	EndIndex       *int    `json:"end_index,omitempty"`
	Confidence     float64 `json:"confidence"`
}

type Finding struct {
	FindingType    string `json:"finding_type"`
	Severity       string `json:"severity"`
	SectionKey     string `json:"section_key,omitempty"`
	Quote          string `json:"quote"`
	Explanation    string `json:"explanation"`
	Recommendation string `json:"recommendation"`
}

type Recommendation struct {
	Category    string `json:"category"`
	Title       string `json:"title"`
	Description string `json:"description"`
	Priority    int    `json:"priority"`
}

type ScorecardItem struct {
	Key         string  `json:"key"`
	Label       string  `json:"label"`
	Score       float64 `json:"score"`
	MaxScore    float64 `json:"max_score"`
	Explanation string  `json:"explanation"`
}

type Scorecard struct {
	ScoreType     string          `json:"score_type"`
	TotalScore    float64         `json:"total_score"`
	MaxTotalScore float64         `json:"max_total_score"`
	Items         []ScorecardItem `json:"items"`
	IsPlaceholder bool            `json:"is_placeholder"`
}

type ModelMetadata struct {
	Mode          string `json:"mode"`
	Provider      string `json:"provider,omitempty"`
	Model         string `json:"model,omitempty"`
	PromptVersion string `json:"prompt_version"`
}

type AnalyzeRequest struct {
	Text             string `json:"text,omitempty"`
	FileBase64       string `json:"file_base64,omitempty"`
	FileURL          string `json:"file_url,omitempty"`
	Filename         string `json:"filename"`
	ContentType      string `json:"content_type"`
	ProjectTitle     string `json:"project_title,omitempty"`
	OrganizationName string `json:"organization_name,omitempty"`
}

type AnalyzeResponse struct {
	AnalysisStatus                   string               `json:"analysis_status"`
	Document                         DocumentMetadata     `json:"document"`
	RawTextPreview                   string               `json:"raw_text_preview"`
	Structure                        NotebookStructure    `json:"structure"`
	Semantic                         NotebookSemantic     `json:"semantic"`
	Score                            NotebookScore        `json:"score"`
	Recommendations                  []Recommendation     `json:"recommendations"`
	GenerateImprovedTZ               NotebookImprovedTZ   `json:"generate_improved_tz"`
	ImprovedTZ                       string               `json:"improved_tz"`
	ExtractedEntities                NotebookEntityBundle `json:"extracted_entities"`
	ConfirmedEntities                NotebookEntityBundle `json:"confirmed_entities"`
	DetectedSections                 []Section            `json:"detected_sections"`
	MissingRequiredSections          []string             `json:"missing_required_sections"`
	WeakSections                     []string             `json:"weak_sections"`
	Findings                         []Finding            `json:"findings"`
	SuggestedStructure               string               `json:"suggested_structure"`
	ImprovedText                     string               `json:"improved_text"`
	AIDocumentAnalysisScorecard      Scorecard            `json:"ai_document_analysis_scorecard"`
	AIPreliminaryEvaluationScorecard Scorecard            `json:"ai_preliminary_evaluation_scorecard"`
	ModelMetadata                    ModelMetadata        `json:"model_metadata"`
}

type GenerateRequest struct {
	Text         string    `json:"text"`
	Mode         string    `json:"mode"`
	FocusSection *string   `json:"focus_section,omitempty"`
	Findings     []Finding `json:"findings,omitempty"`
}

type GenerateResponse struct {
	GenerationStatus string   `json:"generation_status"`
	Mode             string   `json:"mode"`
	Title            string   `json:"title"`
	Content          string   `json:"content"`
	SummaryOfChanges []string `json:"summary_of_changes"`
}

type ChatMessage struct {
	Role    string `json:"role"`
	Content string `json:"content"`
}

type ChatContext struct {
	ProjectTitle        *string          `json:"project_title,omitempty"`
	DocumentTitle       *string          `json:"document_title,omitempty"`
	DocumentTextExcerpt *string          `json:"document_text_excerpt,omitempty"`
	DetectedSections    []Section        `json:"detected_sections,omitempty"`
	Findings            []Finding        `json:"findings,omitempty"`
	Recommendations     []Recommendation `json:"recommendations,omitempty"`
	Scorecards          []Scorecard      `json:"scorecards,omitempty"`
	PreviousMessages    []ChatMessage    `json:"previous_messages,omitempty"`
	AdminFeedback       *string          `json:"admin_feedback,omitempty"`
}

type ChatRequest struct {
	UserMessage string      `json:"user_message"`
	Context     ChatContext `json:"context"`
}

type ChatResponse struct {
	ResponseStatus       string   `json:"response_status"`
	Answer               string   `json:"answer"`
	ReferencedSections   []string `json:"referenced_sections"`
	ReferencedFindings   []string `json:"referenced_findings"`
	SuggestedNextActions []string `json:"suggested_next_actions"`
}
